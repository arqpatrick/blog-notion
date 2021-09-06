import { ChakraProvider } from '@chakra-ui/react'

import Header from "./Header"
import Footer from "./Footer"


export default function Layout({ children }) {
  return (
    <ChakraProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </ChakraProvider>
  )
}