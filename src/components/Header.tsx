import Logo from './Logo'
interface HeaderProps{
    buttons? : {label:string; href:string; variant?: 'primary' | 'outline'}[]
}

export default function Header({ buttons = [] }: HeaderProps){
    const styles = {
        headerStyle : ''
    }



    return (
        <header className={styles.headerStyle}>
            <Logo/>
        </header>
    )
}