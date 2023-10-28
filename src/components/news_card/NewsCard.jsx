import { Avatar, Card, CardBody, CardHeader, Image, Link, Spacer } from "@nextui-org/react"
import { IMAGE_BASE_URL } from "../../utils/config"
import moment from "moment"
import error from "../../assets/error.png"

/* eslint-disable react/prop-types */
const NewsCard = ({ news }) => {
  const currentDate = moment()
  const dif = currentDate.diff(news.pub_date)
  const date = moment.duration(-1 * dif).humanize(true, { s: 60, m: 60, h: 24, d: 7, w: 4 })

  return (
    <Card shadow="lg" classNames={{
      base: "md:flex-row ",
      header: "shrink overflow-hidden",
      body: "shrink md:h-full min-h-[256px]"
    }}>
      <CardHeader className="overflow-hidden md:max-w-xs max-h-56 p-0 rounded-xl md:ml-3 md:my-auto" >
        <div className="m-auto">
          <Image src={news.multimedia.length > 0 ? `${IMAGE_BASE_URL}/${news.multimedia[0].url}` : error} fallbackSrc={error} classNames={{
            img: "md:w-[320px] min-w-[400px] h-[224px] object-cover object-center",
            wrapper: "bg-no-repeat bg-cover bg-center h-[224px]"
          }} />
        </div>
      </CardHeader>
      <CardBody className="flex justify-center ">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar size="sm" />
            <Spacer x={2} />
            <p>{news.byline?.original?.length > 30 ? `${news.byline?.original?.slice(0, 30)} ...` : news.byline.original}</p>
          </div>
          <p>{date}</p>
        </div>
        <div>
          <Link href={news.web_url} isExternal showAnchorIcon className="text-default-foreground font-bold text-xl my-2">
            <h1>{news.headline.main}</h1>
          </Link>
          <p>{news.abstract}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default NewsCard