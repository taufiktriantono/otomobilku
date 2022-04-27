import Layout from '@/Layouts/Main'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { useCallback, useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react';
import { months } from '@/utils';
import { set } from 'lodash';

const params = new URLSearchParams()

export default function Home(props) {

  return (
    <Layout>
        <Head>

        <meta property='title' content={`Situs Jual Beli Mobil Online`} />
        <meta property='description' content={product?.description} />

        <meta property='og:title' content={`${product?.models.brand.name} ${product?.models.name} ${product?.build_year}`} />
        <meta property='og:description' content={product?.description} />
        <meta property='og:type' content={'product'} />
        <meta property='og:site_name' content='Otomobilku' />
        <meta property='og:url' content={`http://otomobilku.id/mobil-bekas/${product?.slug}`} />
        <meta property='og:image' content={`http://otomobilku.id/storage/${product?.images[0].path}`} />

        <meta property='product:price:amount' content={product?.price} />
        <meta property='product:price:currency' content={'IDR'} />

        <meta property='twitter:card' content={'product'} />
        <meta property='twitter:site' content={'@otomobilku.com'} />
        <meta property='twitter:creator' content={'@otomobilku.com'} />
        <meta property='twitter:title' content={`${product?.models.brand.name} ${product?.models.name} ${product?.build_year}`} />
        <meta property='twitter:description' content={product?.description} />
        <meta property='twitter:image' content={`http://otomobilku.id/storage/${product?.images[0].path}`} />
        <meta property='twitter:data1' content={product?.price} />
        <meta property='twitter:label1' content={'Harga'} />

        </Head>
    </Layout>
  )
}
