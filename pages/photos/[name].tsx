import {
    getCatalogItem,
    getPhotoList,
    getRunningQueriesThunk,
    useGetCatalogItemQuery,
    useGetPhotoListItemQuery,
    useGetPhotoListQuery
} from '@/api/api'
import { store, wrapper } from '@/api/store'
import { TPhoto } from '@/api/types'
import { skipToken } from '@reduxjs/toolkit/query'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Script from 'next/script'
import React from 'react'

import ObjectCloud from '@/components/object-cloud'
import PhotoSection from '@/components/photo-section'
import PhotoTable from '@/components/photo-table'

export const getStaticPaths = async () => {
    const storeObject = store()
    const result = await storeObject.dispatch(getPhotoList.initiate())

    return {
        fallback: true,
        paths: result.data?.payload.map((item) => `/photos/${item.object}`)
    }
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
    (store) => async (context) => {
        const name = context.params?.name

        if (typeof name === 'string') {
            store.dispatch(getCatalogItem.initiate(name))
            store.dispatch(getPhotoList.initiate({}))
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()))

        return {
            props: {}
        }
    }
)

const Photo: React.FC = (): JSX.Element => {
    const router = useRouter()
    const routerObject = router.query.name
    const photoDate = router.query.date
    const objectName =
        typeof routerObject === 'string' ? routerObject : skipToken

    const { data: dataCatalog, isLoading: loadingCatalog } =
        useGetCatalogItemQuery(objectName, { skip: router.isFallback })
    const { data: dataPhotosItem, isFetching: loadingPhotosItem } =
        useGetPhotoListItemQuery(objectName, { skip: router.isFallback })
    const { data: dataPhotosList, isLoading: loadingPhotosList } =
        useGetPhotoListQuery({}, { skip: router.isFallback })

    const currentPhoto: TPhoto | undefined = React.useMemo(() => {
        const searchPhoto =
            dataPhotosItem?.payload &&
            photoDate &&
            dataPhotosItem?.payload.filter((photo) => photo.date === photoDate)

        return searchPhoto && searchPhoto.length
            ? searchPhoto.pop()
            : dataPhotosItem?.payload?.[0]
    }, [dataPhotosItem, photoDate])

    const listPhotoNames: string[] = React.useMemo(() => {
        return dataPhotosList?.payload.length
            ? dataPhotosList.payload
                  .map((item) => item.object)
                  .filter(
                      (item, index, self) =>
                          item !== '' && self.indexOf(item) === index
                  )
            : []
    }, [dataPhotosList])

    const photoTitle = React.useMemo(
        () =>
            dataCatalog?.payload
                ? dataCatalog.payload?.title || dataCatalog.payload.name
                : currentPhoto?.object || objectName.toString(),
        [dataCatalog, objectName, currentPhoto]
    )

    return (
        <main>
            <Script
                src='/scripts/d3.min.js'
                strategy='beforeInteractive'
            />
            <Script
                src='/scripts/d3.geo.projection.min.js'
                strategy='beforeInteractive'
            />
            <Script
                src='/scripts/celestial.min.js'
                strategy='beforeInteractive'
            />
            <PhotoSection
                loader={loadingPhotosItem || loadingCatalog}
                title={photoTitle}
                photo={currentPhoto}
                catalog={dataCatalog?.payload}
            />
            {!!dataPhotosItem?.payload.length && (
                <>
                    <br />
                    <PhotoTable photos={dataPhotosItem?.payload} />
                </>
            )}
            <br />
            <ObjectCloud
                loader={loadingPhotosList}
                current={typeof objectName === 'string' ? objectName : ''}
                names={listPhotoNames}
                link='photos'
            />
        </main>
    )
}

export default Photo
