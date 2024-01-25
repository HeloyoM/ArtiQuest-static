import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { QueryClient, QueryClientProvider } from 'react-query'
type Props = {
    children: JSX.Element
}

export default function ScreenContainer(props: Props) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ height: '100vh' }} >
                    {props.children}
                </Box >
            </Container>
        </QueryClientProvider>
    )
}