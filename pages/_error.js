import Link from 'next/link'

function Error({ statusCode }) {
  return (
    <>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      <p> If you are stuck in this error after a reload, consider reseting your local databases <Link href="/reset"><a>here</a></Link></p>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = err === null ? 404 : (res ? res.statusCode : (err ? err.statusCode : null))
  return { statusCode }
}

export default Error
