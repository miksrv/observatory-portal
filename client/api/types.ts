export interface IRestResponse {
    status: boolean
    payload?: any
    errorText?: string
}

export interface IRestFilesMonth extends IRestResponse {
    payload: TFilesMonth[]
}

// CATALOG
export interface IRestCatalogList extends IRestResponse {
    payload: TCatalog[]
}

export interface IRestCatalogItem extends IRestResponse {
    payload: TCatalog
}

// PHOTO
export interface IRestPhotoList extends IRestResponse {
    payload: TPhoto[]
}

// OBJECT
export interface IRestObjectList extends IRestResponse {
    payload: IObjectListItem[]
}

export interface IRestObjectNames extends IRestResponse {
    payload: string[]
}

export interface IRestObjectItem extends IRestResponse {
    payload: TObject
}

// FILES
export interface IRestObjectFiles extends IRestResponse {
    payload: TFIle[]
}

// NEWS
export interface IRestNewsList extends IRestResponse {
    payload: {
        count: number
        news: TNews[]
    }
}

// WEATHER
export interface IRestWeatherMonth extends IRestResponse {
    payload: {
        date: string
        weather: TWeatherMonth[]
    }
}

export interface IRestWeatherCurrent extends IRestResponse {
    payload: {
        timestamp: {
            server: number
            update: number
        }
        conditions: TWeatherCurrent
    }
}

// AUTH
export interface IRestAuth {
    status: boolean
    token: string
}

export interface ICredentials {
    username: string
    password: string
}

// RELAY

export interface IRelayList extends IRestResponse {
    payload: string[]
}

export interface IRelaySet {
    index: number
    state: number
}

// SENSOR
export interface IRestSensorStatistic extends IRestResponse {
    payload: TSensorsPayload[]
}

export type TSensorsPayload = {
    time: number
    sensors: TSensors
}

export type TSensors = {
    t?: number
    h?: number
    t1?: number
    t2?: number
    t3?: number
    v1?: number
    p1?: number
    p2?: number
    p3?: number
}

export interface APIResponseStatistic {
    photos_count: number
    catalog_count: number
    frames_count: number
    total_exposure: number
    files_size: number
}

export interface APIRequestCategories {
    items: TCategory[]
}
export interface APIRequestPhotos {
    limit?: number
}
export interface APIResponsePhotos {
    items: TPhoto[]
}

export interface APIResponseCatalog {
    items: TCatalog[]
}

export interface IObjectListItem {
    name: string
    date: string
    frames: number
    exposure: number
    Luminance: number
    Red: number
    Green: number
    Blue: number
    Ha: number
    OIII: number
    SII: number
}

export type TCategory = {
    id: number
    name: string
}

export type TCatalog = {
    name: string
    title: string
    text: string
    category: number
    coord_ra: number
    coord_dec: number
    statistic: TStatistic
    filters: TFilters
}

export type TPhoto = {
    id: number
    object: string
    date: string
    author: number
    image_name: string
    image_ext: string
    image_size: number
    statistic: TStatistic
    filters: TFilters
}

export type TStatistic = {
    frames: number
    data_size: number
    exposure: number
}

export type TFilters = {
    luminance?: TFiltersItem
    red?: TFiltersItem
    green?: TFiltersItem
    blue?: TFiltersItem
    hydrogen?: TFiltersItem
    oxygen?: TFiltersItem
    sulfur?: TFiltersItem
    clear?: TFiltersItem
}

export type TFiltersItem = {
    exposure: number
    frames: number
}

export enum TFilterTypes {
    luminance = 'luminance',
    red = 'red',
    green = 'green',
    blue = 'blue',
    hydrogen = 'hydrogen',
    oxygen = 'oxygen',
    sulfur = 'sulfur',
    clear = 'clear'
}

// export type TPhoto = {
//     object: string
//     date: string
//     file: string
//     ext: string
//     author: TPhotoAuthor | null
//     parameters?: TObject
// }

export type TPhotoAuthor = {
    name: string
    link: string
}

// export type TCatalog = {
//     name: string
//     title: string
//     text: string
//     category: string
//     ra: number
//     dec: number
// }

export type TObject = {
    date: string
    exposure: number
    frames: number
    filesizes: number
    filters: TObjectFilters
}

export type TObjectFilters = {
    Luminance: TFilterItem
    Red: TFilterItem
    Green: TFilterItem
    Blue: TFilterItem
    Ha: TFilterItem
    OIII: TFilterItem
    SII: TFilterItem
}

export type TFIle = {
    id: string
    name: string
    date: string
    filter: TFiltersTypes
    exposure: number
    temp: number
    gain: number
    offset: number
    dec: number
    ra: number
    stars: number
    hfr: number
    sky: number
    image: boolean
}

export type TNews = {
    date: number
    text: string
    link: string
    comments: number
    likes: number
    reposts: number
    views: number
    photos: TNewsPhotos[] | undefined
}

export type TFilesMonth = {
    date: string
    exposure: number
    frames: number
    objects: string[]
}

export type TWeatherMonth = {
    date: string
    clouds: number
    temperature: number
    wind_speed: number
}

export type TWeatherCurrent = {
    condition_id: number
    temperature: number
    temperature_feels: number
    humidity: number
    pressure: number
    wind_speed: number
    wind_gust: number
    wind_degree: number
    clouds: number
    precipitation: number
    illumination: number
    uvindex: number
}

export type TNewsPhotos = {
    full: TNewsPhotosItem
    thumb: TNewsPhotosItem
}

export type TNewsPhotosItem = {
    height: number
    width: number
    src: string
}

export type TFiltersTypes =
    | 'Luminance'
    | 'Red'
    | 'Green'
    | 'Blue'
    | 'Ha'
    | 'OIII'
    | 'SII'

export type TFilterItem = {
    exposure: number
    frames: number
}
