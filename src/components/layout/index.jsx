import Footer from "./Footer"
import NavigationBar from "./NavigationBar"

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return (
        <main className="text-foreground bg-background min-h-screen">
            <NavigationBar />
            <div className="max-w-screen-lg mx-auto p-5">
                {children}
            </div>
            <Footer />
        </main>
    )
}

export default Layout