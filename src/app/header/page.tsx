import Link from "next/link"

const HeaderPage = async () => {

    return (
        <div className="flex justify-center items-center h-full flex-col">
            <h1 className="text-3xl md:text-6xl mb-2 md:mb-5">Setsu Open Source Link Shortener</h1>
            <h3 className="text-2xl mb-6 text-gray-400">
                based on <span className="text-white hover:text-red-200"><Link href='https://slug.vercel.app' target="_blank">Slug</Link></span> Link Shortener
            </h3>

            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <Link href="/dashboard">Getting Started
                </Link>
            </button>

        </div>
    )
}

export default HeaderPage