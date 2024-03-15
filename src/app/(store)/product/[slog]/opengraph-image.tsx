/* eslint-disable @next/next/no-img-element */
import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { env } from '@/env'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'
async function getProduct({ slog }: { slog: string }): Promise<Product> {
  const response = await api(`/products/${slog}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = await response.json()

  return product
}
// Image generation
export default async function OgImage({
  params,
}: {
  params: { slog: string }
}) {
  // Font
  // const interSemiBold = fetch(
  //   new URL('./Inter-SemiBold.ttf', import.meta.url),
  // ).then((res) => res.arrayBuffer())

  const product = await getProduct({ slog: params.slog })

  const productImageURL = new URL(product.image, env.APP_URL)
  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL.href} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
      // fonts: [
      //   {
      //     name: 'Inter',
      //     data: await interSemiBold,
      //     style: 'normal',
      //     weight: 400,
      //   },
      // ],
    },
  )
}
