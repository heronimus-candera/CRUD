import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Container, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Stack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const toast = useToast()
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [visible, setVisible] = useState(false)

    const alamatHost = 'localhost' //ganti ke '172.18.25.55' pas ujian

    useEffect(() => {
        cekLogin()
    },)

    const cekLogin = () => {
        const username = localStorage.getItem('username')

        if(username !== null) {
            navigate('/home', {
                replace: true
            })
        }
    }

    const doLogin = async() => {
        await fetch(`http://${alamatHost}:3000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": user,
                "password": pass
            })
        }).then(async(response) => {
            const result = await response.json()

            toast({
                title: 'Login Aplikasi',
                description: result.pesan,
                variant: "left-accent",
                status: "success",
                isClosable: true,
                duration: 2000,
                position: "bottom-right"
            })

            if(result.pesan === 'Login berhasil') {
                localStorage.setItem('username', user)
                localStorage.setItem('token', result.token)

                navigate('/home', {
                    replace: true
                })
            }
        })
    }

    const gotoRegister = () => {
        navigate('/register', {
            replace: true
        })
    }

    return(
        <Container maxW={"lg"} py={12} px={0}>
            <Center>
                <Box boxShadow={"md"} p={10} mt={10} borderRadius={15}>
                    <Stack spacing={5}>
                        <Heading size={"lg"}>Login Aplikasi</Heading>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={!visible ? "password" : "text"} value={pass} onChange={(e) => setPass(e.target.value)} />
                                <InputRightElement>
                                    <IconButton variant={'ghost'} colorScheme="blue" onClick={() => setVisible(!visible)} icon={!visible ? <ViewIcon/> : <ViewOffIcon/>}/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button onClick={doLogin} variant={"solid"} colorScheme="blue">Login</Button>
                        <Button onClick={gotoRegister} variant={"link"} colorScheme="blue">Register Akun</Button>
                    </Stack>
                </Box>
            </Center>
        </Container>
    )
}

export default LoginPage