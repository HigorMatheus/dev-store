import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
async function getProduct({ slog }: { slog: string }): Promise<Product> {
  const response = await api(`/products/${slog}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = await response.json()

  return product
}
interface ProductPageProps {
  params: { slog: string }
}
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct({ slog: params?.slog })
  return {
    title: product?.title,
  }
}
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct({ slog: params?.slog })

  return (
    <div className="relative grid h-full max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product?.image}
          width={1000}
          height={1000}
          quality={100}
          alt=""
        />
      </div>
      <div className=" flex grid-cols-1 flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product?.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product?.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className="text-nowrap text-sm text-zinc-400">
            Em 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product?.id} />
      </div>
    </div>
  )
}
