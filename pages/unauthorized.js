import React from 'react'
import Heading from '../components/UI/Heading/Heading'
import Link from 'next/link'
import NotFoundWrapper,{ ContentWrapper } from '../containers/404/404.style'
import Image from 'next/image'

const unauthorized = () => {
  return (
    // <div className="unauthorized" >
    //   <img src="/images/unauthorized.svg" alt="Example SVG" />
    //   <Heading as="h2" content={"You're unauthorized to access this page"} />
    //     <Link href="/">
    //       <a>Go Back to Home</a>
    //     </Link>
    // </div>
    <NotFoundWrapper>

    <ContentWrapper>
        <Image
          src="/images/unauthorized.svg"
          width="560"
          height="315"
          alt={String(401)}
        />
        <Heading as="h2" content={`You're unauthorized to access this page` } />
        <Link href="/">
          <a>Go Back to Home</a>
        </Link>
      </ContentWrapper>
    </NotFoundWrapper>

  )
}

export default unauthorized