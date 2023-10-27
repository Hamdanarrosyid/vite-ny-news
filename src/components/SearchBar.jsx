import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { LiaSearchSolid } from "react-icons/lia"
import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const SearchBar = ({ onSearchCLick }) => {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('searchQuery') ?? '')
    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            return onSearchCLick(search)
        }}>
            <Input
                classNames={{
                    base: "max-w-full h-10 focus:",
                    mainWrapper: "h-full",
                    //   input: "text-lg",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 pr-0",
                }}
                placeholder="Type to search..."
                size="md"
                endContent={<Button type="submit" radius="none" isIconOnly><LiaSearchSolid /></Button>}
                type="search"
                value={search}
                onValueChange={(v) => setSearch(v)}
            />
        </form>
    )
}

export default SearchBar