import { Pagination, Spacer } from "@nextui-org/react"
import Layout from "../components/layout"
import SearchBar from '../components/SearchBar'
import useSWR from "swr"
import { API_BASE_URL, API_KEY } from "../utils/config"
import NewsCardSkeleton from "../components/news_card/NewsCardSkeleton"
import { useEffect, useState } from "react"
import NewsCard from "../components/news_card/NewsCard"
import { useSearchParams } from "react-router-dom"

function App() {
  const [dataState, setDataState] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageIndex, setPageIndex] = useState(1)
  const [pageTotal, setPageTotal] = useState(1)
  const [search, setSearch] = useState('')

  const fetcher = (...args) => fetch(...args).then((res) => {
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }
    return res.json()
  })
  const { data, error, isLoading } = useSWR(`${API_BASE_URL}/articlesearch.json?api-key=${API_KEY}&sort=newest&page=${pageIndex}&fq=${search}`, fetcher, { refreshInterval: 0 })

  const handleSearchClick = (v) => {
    const q = v != '' ? `headline:("${v}")` : ''
    setSearch(q)
    setSearchParams(() => ({ pageIndex: 1, searchQuery: v }))
  }

  const handleClickPagination = (v) => {
    // eslint-disable-next-line no-unused-vars
    const _ = searchParams.entries()
    setSearchParams(() => ({ searchQuery: searchParams.get('searchQuery') ?? '', pageIndex: v }))
    setPageIndex(v)
  }

  useEffect(() => {
    const page = searchParams.get('pageIndex') ?? 1
    const q = searchParams.get('searchQuery') != '' && searchParams.get('searchQuery') != null ? `headline:("${searchParams.get('searchQuery')}")` : ''
    setSearch(q)
    setPageIndex(parseInt(page))
    if (!isLoading && !error) {
      setDataState(data.response.docs)
      setPageTotal(data.response.meta.hits >= 200 ? 200 : data.response.docs.length <= 10 ? 1 : data.response.meta.hits)
    }
  }, [data, dataState, isLoading, error, searchParams])

  return (
    <Layout>
      {/* Jumbotron */}
      <div className="relative bg-jumbotron-search h-40 bg-center bg-no-repeat flex justify-center items-center rounded-lg overflow-hidden">
        <div className="absolute bg-gradient-to-t from-black h-full w-full opacity-50 z-0"></div>
        <div className="z-10 bg-white w-full mx-5 rounded-xl overflow-hidden">
          <SearchBar onSearchCLick={handleSearchClick} />
        </div>
      </div>
      <Spacer y={4} />
      {/* list of newest news */}
      <div className="space-y-4">
        {
          isLoading ? [1, 2, 3, 4].map(x => (
            <NewsCardSkeleton key={x} />
          )) : error ? (
            <div className="flex justify-center">
              <p>Failed load data with error: {error.message}</p>
            </div>
          ) : dataState?.length == 0 ? (
            <div className="flex justify-center">
              <p>Data is empty</p>
            </div>
          ) : (
            <>
              {dataState?.map(val => (
                <NewsCard news={val} key={val._id} />
              ))}
              <Spacer y={4} />
              {/* pagination */}
              <div className="flex justify-end">
                <Pagination total={pageTotal} page={pageIndex} initialPage={1} onChange={handleClickPagination} />
              </div>
            </>
          )
        }
      </div>

    </Layout>
  )
}

export default App
