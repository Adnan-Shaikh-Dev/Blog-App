import React, { useEffect, useState } from "react";
import InPageNavigation from "../components/inpage-navigation.component";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import {
  activeTabLineRef,
  activeTabRef,
} from "../components/inpage-navigation.component";
const Homepage = () => {
  let [blogs, setBlog] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pageState, setPageState] = useState("home");

  let categories = [
    "programming",
    "hollywood",
    "film making",
    "social media",
    "cooking",
    "tech",
    "finances",
    "travel",
  ];
  const fetchLatestBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
      .then(({ data }) => {
        setBlog(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBlogsByCategory = async () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tag: pageState,
      })
      .then(({ data }) => {
        setBlog(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogByCategory = (e) => {
    console.log("click");
    let category = e.target.innerText.toLowerCase();
    setBlog(null);
    if (pageState == category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  useEffect(() => {
    activeTabRef.current.click();
    if (pageState == "home") {
      fetchLatestBlogs();
    } else {
      fetchBlogsByCategory();
    }
    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          {/* {latest blogs} */}
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                Array.isArray(blogs) &&
                blogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
              )}
            </>

            {trendingBlogs == null ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            )}
          </InPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden ">
          {/* {Filters and trending blogs} */}
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      key={i}
                      className={
                        "tag " +
                        (pageState == category
                          ? "bg-black text-white"
                          : "first-letter:")
                      }
                      onClick={loadBlogByCategory}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="font-medium text-xl mb-8">
                Trending <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>
              {trendingBlogs == null ? (
                <Loader />
              ) : (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <MinimalBlogPost blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Homepage;
