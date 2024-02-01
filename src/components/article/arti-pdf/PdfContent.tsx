import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import { Article } from '../../../interface/article.interface'
import FileHeader from './PdfFileHeader'

type Props = {
    art: Article
}
const PdfTemplate = ({ art }: Props) => {
    const creatorName = art.auther.first_name + ' ' + art.auther.last_name

    const paragraphs = art.body.split(/[\n\r]+/)

    return (
        <Document>
            <Page style={styles.body}>

                <FileHeader date={art.created} />

                <Text style={styles.title}>
                    {art.title}
                </Text>

                <Text style={styles.subTitle}>
                    {art.sub_title ? art.sub_title : ''}
                </Text>

                <Text>
                    {creatorName}
                </Text>

                {paragraphs.map((paragraph, index) => (
                    <Text key={index} >
                        {paragraph}
                    </Text>
                ))}

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}
export default PdfTemplate

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: '15px'
    },
    subTitle: {
        color: 'grey',
        wordBreak: 'break-all',
        display: 'flex',
        textAlign: 'center',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
})