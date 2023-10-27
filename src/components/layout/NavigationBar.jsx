import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { BsFillMoonFill,BsSunFill } from 'react-icons/bs'

const NavigationBar = () => {
    const { theme, setTheme } = useTheme()
    return (
        <Navbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link href="/" className="font-bold text-inherit">NY News</Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3">
                    <NavbarItem>
                        <Link color="foreground" href="/">
                            Home
                        </Link>
                    </NavbarItem>

                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <Button  onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')} isIconOnly>{theme == 'dark' ? <BsSunFill size={18} color="#eab308"/> : (<BsFillMoonFill color="#6b21a8"/>)}</Button>
            </NavbarContent>
        </Navbar>
    )
}

export default NavigationBar