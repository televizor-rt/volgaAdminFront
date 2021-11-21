import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head >
                    <script src={"https://api-maps.yandex.ru/2.1/?apikey=79ad5af0-f8b7-4d28-9d51-c3cd0cbe5a4a&lang=ru_RU"} type="text/javascript"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument