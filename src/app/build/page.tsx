
import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { Logo } from '@/components/Logo'
import { createClient } from '@/prismicio'
import Link from 'next/link'
import React from 'react'
import { CustomizerControlsProvider } from './context'
import Preview from './Preview'
import { asImageSrc } from '@prismicio/client'
import Controls from './Controls'
import Loading from './Loading'

type searchParams = {
    wheel?: string;
    deck?: string;
    truck?: string;
    bolt?: string;
}

export default async function page(Props:{searchParams:Promise<searchParams>}) {
    const searchParams = await Props.searchParams;
    const client = createClient();
    const customizerSettings = await client.getSingle("board_customizer")
    const { wheels, decks, texture } = customizerSettings.data;


     const defaultWheel = wheels?.find((wheel) => wheel.uid === searchParams.wheel) || wheels?.[0];
    const defaultDeck = decks?.find((deck) => deck.uid === searchParams.deck) || decks?.[0];
    const defaultTruck = texture?.find((truck) => truck.uid === searchParams.truck) || texture?.[0];
    const defaultBolt = texture?.find((bolt) => bolt.uid === searchParams.bolt) || texture?.[0];


    const wheelTextureURLs = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));
  const deckTextureURLs = decks
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));


  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
        <CustomizerControlsProvider
            defaultWheel={defaultWheel}
            defaultDeck={defaultDeck}
            defaultTruck={defaultTruck}
            defaultBolt={defaultBolt}
        >
            <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
                <div className="absolute inset-0">
                    <Preview WheelsTextureURLs={wheelTextureURLs} deckTextureURLs={deckTextureURLs} />
                </div>
                <Link href="/" className="absolute left-6 top-6">
                    <Logo className="h-12 text-white" />
                </Link>
            </div>
            <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
                <Heading as="h1" size="sm" className="mb-6 mt-0">
                    Build your board
                </Heading>
                <Controls
                    wheels={wheels}
                    decks={decks}
                    texture={texture}
                    className='mb-6'
                />
                <ButtonLink href="" color="lime" icon="plus">
                    Add to cart
                </ButtonLink>
            </div>
        </CustomizerControlsProvider>
        <Loading />
    </div>
)
}