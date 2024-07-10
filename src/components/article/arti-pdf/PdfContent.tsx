import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import { Article } from '../../../interface/article.interface'
import FileHeader from './PdfFileHeader'

type Props = {
    art: Article<any>
}
const PdfTemplate = ({ art }: Props) => {
    const creatorName = art.author.first_name + ' ' + art.author.last_name

    return (
        <Document>
            <Page style={styles.body}>

                <FileHeader date={art.createdAt} />

                <Text style={styles.title}>
                    {art.title}
                </Text>

                <Text style={styles.subTitle}>
                    {art.sub_title ? art.sub_title : ''}
                </Text>

                <Text>
                    {creatorName}
                </Text>

                {art.body.blocks.map(({ text }, index) => {
                    return (
                        <Text key={index} style={{ fontSize: '22px', fontWeight: 'bold', margin: '2% 0px' }}>
                            {text}
                        </Text>
                    )
                })}

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