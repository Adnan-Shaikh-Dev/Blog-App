import React from 'react'
import InPageNavigation from '../components/inpage-navigation.component'
import AnimationWrapper from '../common/page-animation'
const Homepage = () => {
  return (
    <AnimationWrapper>
        <section className='h-cover flex justify-center gap-10'>
            <div className='w-full'>
                {/* {latest blogs} */}
                <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                    <h1>Latest Blogs here</h1>
                    <h1>Trending Blogs here</h1>
                </InPageNavigation>
            </div>
            <div>
                {/* {Filters and trending blogs} */}
            </div>
        </section>
    </AnimationWrapper>
)
}

export default Homepage