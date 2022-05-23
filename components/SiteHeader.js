import Link from "next/link"
import AuthBtn from "./AuthBtn"

const SiteHeader = () => {

  return (
    <header className={"site-header"}>
      <div className="wrapper">
        <figure className="logo">
          <Link href={`/`} passHref={true}>📝 Notes</Link>
        </figure>

        <AuthBtn />
      </div>
    </header>
  )
}

export default SiteHeader