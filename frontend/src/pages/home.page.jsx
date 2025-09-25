import React, { useEffect, useState } from 'react'
import InPageNavigation from '../components/inpage-navigation.component'
import AnimationWrapper from '../common/page-animation'
import axios from 'axios';
import Loader from '../components/loader.component'
const Homepage = () => {
    let [blogs, setBlog] = useState(null) 
    const fetchLatestBlogs = () =>{
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/latest-blogs')
        .then(({data})=>{
            setBlog(data.blogs)
        }).catch(err =>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchLatestBlogs()
    },[])
  return (
    <AnimationWrapper>
        <section className='h-cover flex justify-center gap-10'>
            <div className='w-full'>
                {/* {latest blogs} */}
                <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>

                    <>
                    {
                        blogs === null ? <Loader/> :
                       Array.isArray(blogs)&& blogs.map((blog,i)=>{
                        return <h1 key={i}>{blog.title}</h1>
                    })
                    }
                    </>

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