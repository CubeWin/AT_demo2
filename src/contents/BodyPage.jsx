import Card from "../components/Card"
import useCharacterGet from "../hooks/useCharacterGet"

export default () => {

    const [isLoading, characters] = useCharacterGet()


    if (isLoading) return <i>...Loading</i>;

    return (
        <>
            <div className='w-[100%] bg-slate-400 text-white p-3 flex flex-wrap justify-center gap-2 text-[20px] shadow rounded'>
                {characters.length > 0 &&
                    characters.map(c => {
                        return <Card key={c.id} nombre={c.name} tipo={c.gender} estado={c.status} imagen={c.image}  origen={c.origin} />;
                    })}
            </div>
        </>
    )
}