import { TFIle } from '@/api/types'
import moment from 'moment'
import React from 'react'
import { Image, Table } from 'semantic-ui-react'

import MoonPhase from '@/components/moon-phase'

import styles from './styles.module.sass'

type TTableRow = {
    item: TFIle
    itemId: number
    object: string
    onPhotoClick: (photoId: number) => void
}

const RenderTableRow: React.FC<TTableRow> = (props) => {
    const { item, itemId, object, onPhotoClick } = props

    return (
        <Table.Row>
            <Table.Cell>
                {item.image ? (
                    <Image
                        className={styles.fitsImage}
                        onClick={() => onPhotoClick(itemId)}
                        src={`${process.env.NEXT_PUBLIC_API_HOST}uploads/${object}/${item.name}_thumb.jpg`}
                    />
                ) : (
                    ''
                )}
                {item.name}
            </Table.Cell>
            <Table.Cell>{item.exposure}</Table.Cell>
            <Table.Cell className={`filter-${item.filter}`}>
                {item.filter}
            </Table.Cell>
            <Table.Cell>{item.temp}</Table.Cell>
            <Table.Cell>{item.gain}</Table.Cell>
            <Table.Cell>{item.offset}</Table.Cell>
            <Table.Cell>{item.stars}</Table.Cell>
            <Table.Cell>{item.sky}</Table.Cell>
            <Table.Cell>{item.hfr}</Table.Cell>
            <Table.Cell>
                <MoonPhase
                    date={moment.utc(item.date).utcOffset('GMT+05:00')}
                />
                {moment
                    .utc(item.date)
                    .utcOffset('GMT+05:00')
                    .format('D.MM.Y, H:mm')}
            </Table.Cell>
        </Table.Row>
    )
}

export default RenderTableRow