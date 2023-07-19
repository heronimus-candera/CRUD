import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Button, Container, Divider, FormControl, FormLabel, HStack, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"

function MenuPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [dataMenu, setDataMenu] = useState([])
    const [tipe, setTipe] = useState('')
    const [kode, setKode] = useState('')
    const [nama, setNama] = useState('')
    const [kategori, setKategori] = useState('')
    const [harga, setHarga] = useState('')

    const alamatHost = 'localhost' //ganti ke '172.18.25.55' pas ujian

    useEffect(() => {
        getData()
    })

    const getData = async() => {
        const token = localStorage.getItem('token')

        await fetch(`http://${alamatHost}:3000/menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(async(response) => {
            const result = await response.json()
            setDataMenu(result.data)
        })
    }

    const tambahData = () => {
        setTipe('tambah')
        setKode('')
        setNama('')
        setKategori('')
        setHarga('')

        onOpen()
    }

    const editData = (data) => {
        setTipe('edit')
        setKode(data.kodemenu)
        setNama(data.namamenu)
        setKategori(data.kategori)
        setHarga(data.harga)

        onOpen()
    }

    const hapusData = (data) => {
        setTipe('hapus')
        setKode(data.kodemenu)
        setNama(data.namamenu)
        setKategori(data.kategori)
        setHarga(data.harga)

        onOpen()
    }

    const simpanData = async() => {
        let url = `http://${alamatHost}:3000/menu`
        let method = 'POST'
        let data = JSON.stringify({
            "kode": kode,
            "nama": nama,
            "kategori": kategori,
            "harga": harga
        })
        const token = localStorage.getItem('token')

        switch(tipe) {
            case 'edit':
                method = 'PUT'
                url += `/${kode}`
                break
            case 'hapus':
                method = 'DELETE' 
                url += `/${kode}`
                break
            default: url += ''
        }

        await fetch(url, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(async(response) => {
            const result = await response.json()

            toast({
                title: 'Data Menu',
                description: result.pesan,
                variant: "left-accent",
                status: "success",
                isClosable: true,
                duration: 2000,
                position: "bottom-right"
            })

            getData()
            onClose()
        })
    }

    return(
        <div>
            <Container maxW={"full"} p={4}>
                <Stack>
                    <Heading>Data Menu</Heading>
                    <Divider/>
                    <Button onClick={tambahData} size={'sm'} leftIcon={<AddIcon/>} colorScheme="green" w={"fit-content"}>Tambah Data</Button>
                    <TableContainer>
                        <Table variant={"simple"}>
                            <Thead>
                                <Th>#</Th>
                                <Th>Kategori</Th>
                                <Th>Kode</Th>
                                <Th>Nama</Th>
                                <Th>Harga</Th>
                                <Th>Aksi</Th>
                            </Thead>
                            <Tbody>
                            {dataMenu.map((row, index) => (
                                <Tr>
                                    <Td>{++index}</Td>
                                    <Td>{row.kategori}</Td>
                                    <Td>{row.kodemenu}</Td>
                                    <Td>{row.namamenu}</Td>
                                    <Td>{row.harga}</Td>
                                    <Td>
                                        <HStack>
                                            <IconButton onClick={() => editData(row)} colorScheme="blue" size={'sm'} title="Edit" icon={<EditIcon/>}/>
                                            <IconButton onClick={() => hapusData(row)} colorScheme="red" size={'sm'} title="Hapus" icon={<DeleteIcon/>}/>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                            </Tbody>
                            <Tfoot>
                                <Th colSpan={5}>Jumlah Data</Th>
                                <Th>{dataMenu.length}</Th>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Form Input Menu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <FormControl>
                                <FormLabel>Kode Menu</FormLabel>
                                <Input type="text" value={kode} onChange={(e) => setKode(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nama Menu</FormLabel>
                                <Input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Kategori</FormLabel>
                                <Select value={kategori} onChange={(e) => setKategori(e.target.value)} >
                                    <option value='' disabled>- Pilih Kategori -</option>
                                    <option>Makanan</option>
                                    <option>Minuman</option>
                                    <option>Snack</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Harga</FormLabel>
                                <Input type="number" value={harga} onChange={(e) => setHarga(e.target.value)}  />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={simpanData} leftIcon={<CheckIcon />} colorScheme={tipe==='tambah' ? "green" : tipe==='edit' ? "blue": "red"} mr={3}>{tipe==='tambah' ? 'Simpan' : tipe==='edit' ? 'Update': 'Delete'}</Button>
                        <Button leftIcon={<CloseIcon />} onClick={onClose}>Batal</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default MenuPage