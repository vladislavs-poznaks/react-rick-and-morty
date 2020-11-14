type CharacterType  = {
    id?: number,
    name: string,
    image: string,
    status: 'Alive' | 'Dead' | 'unknown',
    species?: string,
    gender?: string,
    origin?: {
        name: string,
        url: string
    },
    location?: {
        name: string,
        url: string
    }
}
export type { CharacterType };