import Prismic from '@prismicio/client'


export function getPrismicClient (req?: any){
    const prismic = Prismic.client('https://trsm.cdn.prismic.io/api/v2', {
        req,
    })

    return prismic;
}