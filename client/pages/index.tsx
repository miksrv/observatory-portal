import {
    catalogGetList,
    getRunningQueriesThunk,
    useCatalogGetListQuery,
    usePhotoGetListQuery
} from '@/api/api'
import { wrapper } from '@/api/store'
import { NextSeo } from 'next-seo'
import React from 'react'

import Calendar from '@/components/calendar'
import PhotoGrid from '@/components/photo-grid'
import Statistic from '@/components/statistic'

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    store.dispatch(catalogGetList.initiate())

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
        props: { object: {} }
    }
})

export default function Home() {
    const { data: photoData, isLoading: photoLoading } = usePhotoGetListQuery({
        limit: 4,
        order: 'random'
    })
    const { data: catalogData, isLoading: catalogLoading } =
        useCatalogGetListQuery()

    return (
        <main>
            <NextSeo
                title={'Любительская астрономическая обсерватория'}
                description={
                    'Самодельная любительская астрономическая обсерватория с удаленным доступом из любой точки мира через интернет. Статистика работы обсерватории, количество отснятых кадров и накопленных данных. Календарь работы телескопа.'
                }
                openGraph={{
                    images: [
                        {
                            height: 819,
                            url: '/screenshots/main.jpg',
                            width: 1280
                        }
                    ],
                    locale: 'ru'
                }}
            />
            <Statistic />
            <br />
            <PhotoGrid
                loading={photoLoading || catalogLoading}
                loaderCount={4}
                photos={photoData?.items}
                catalog={catalogData?.items}
            />
            <br />
            <Calendar />
        </main>
    )
}
