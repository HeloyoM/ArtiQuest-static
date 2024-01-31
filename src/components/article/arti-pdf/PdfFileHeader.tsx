import { Text, StyleSheet, View } from '@react-pdf/renderer'

const FileHeader = () => {
    return (
        <>
            <View style={styles.svgContainer}>
                ArtiQuest
            </View>
            <Text style={styles.time} fixed>
                {new Date().getTime().toLocaleString()}
            </Text>
        </>
    )
}

export default FileHeader

const styles = StyleSheet.create({
    time: {
        display: 'flex',
        fontWeight: 400,
        fontSize: '12px',
        padding: '8px'
    },
    svgContainer: {
        width: '100%',
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})