import { Box, Container, HStack, Link, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MenuPage from "./Menu"

function HomePage() {
    const navigate = useNavigate()
    const [child, setChild] = useState()

    const showMenuPage = () => {
        setChild(<MenuPage/>)
    }

    const doLogOut = () => {
        if(window.confirm('Yakin ingin logout?')) {
            localStorage.clear()
            navigate('/', {
                replace: true
            })
        }
    }

    return (
        <Container maxW={"full"} p={0}>
            <Stack>
                <Box shadow={"lg"} bgColor={"blue.500"} p={4}>
                    <HStack justifyContent={"space-between"}>
                        <Link href={'/home'} color={"white"} fontWeight={"bold"}>Dashboard Admin</Link>
                        <HStack spacing={10}>
                            <Link color={"white"} onClick={showMenuPage}>Data Menu</Link>
                            <Link color={"white"} onClick={doLogOut}>Log Out</Link>
                        </HStack>
                    </HStack>
                </Box>
                <Box>{child}</Box>
            </Stack>
        </Container>
    )
}

export default HomePage