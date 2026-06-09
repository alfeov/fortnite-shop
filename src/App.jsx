import Main from '@/components/Main/Main'
import Header from '@/components/Header/Header'
import { ShopProvider } from '@/ShopProvider'

function App() {
  return (
    <>
      <Header />
      <ShopProvider>
        <Main />
      </ShopProvider>
    </>
  )
}

export default App
