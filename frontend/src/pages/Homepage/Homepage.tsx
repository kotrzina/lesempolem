import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './Homepage.css';
import Address from "../../Address";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {FC} from "react";

const photoAlbums: { author: string; url: string }[] = [
    {author: 'Dana', url: 'https://www.rajce.idnes.cz/dao/album/lesempolem-2026'},
];

export const HomepagePage: FC = () => {

    useDocumentTitle('Běžecké závody ve Veselici')

    const navigate = useNavigate();

    function handleClickbait() {
        navigate(Address.resultsPlaceholder.replace(':year', '2026'))
    }

    return (
        <>
            <Row className={'d-lg-none'}>
                <Col xs={12}>

                </Col>
                <Col xs={12}>
                    <h1 style={{padding: 0}}>Běžecké závody LESEMPOLEM</h1>

                    <p>
                        Lesempolem je jedinečný běžecký závod, který se každoročně koná v malebném prostředí obce
                        Veselice v Jihomoravském kraji. Trať závodu vede převážně lesními a polními cestami v okolí
                        rozhledny Podvrší, což nabízí nádherné výhledy a zážitek z běhu v přírodě. Závod je určen pro
                        široké spektrum běžců – od amatérů až po zkušené závodníky – a nabízí tři tratě: 14 km,
                        maraton (42 km) a ultramaraton (84 km). Díky různorodosti tratí si zde každý najde
                        výzvu odpovídající své kondici.
                        Maraton je součástí Okresní běžecké ligy Blansko.

                        Start a cíl se nachází ve sportovním areálu ve Veselici, kde na
                        běžce i jejich doprovod čeká bohatý program, občerstvení a přátelská atmosféra. Ať už jste
                        zkušený běžec, nebo si chcete užít pohyb v přírodě, Lesempolem je akcí, na kterou budete rádi
                        vzpomínat.

                        Pokud potřebujete další informace o nadcházejícím ročníku, sledujte naše oficiální stránky.
                        Těšíme se na vás na startovní čáře!
                    </p>
                </Col>
                <Col xs={12}>
                    <div className={'d-flex flex-wrap gap-2 mb-3'}>
                        <Button
                            variant={'success'}
                            size={"lg"}
                            onClick={() => handleClickbait()}>
                            Výsledky 16. 5. 2026
                        </Button>
                        {photoAlbums.map((album) => (
                            <Button
                                key={album.url}
                                variant={'success'}
                                size={'lg'}
                                href={album.url}
                                target={'_blank'}
                                rel={'noopener noreferrer'}>
                                Fotky od {album.author}
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>

            <Row id={'bb'} className={'d-none d-sm-none d-md-none d-lg-block'}>
                <Button variant={"success"} size={'lg'} className={'btn-big mb-3'} onClick={() => handleClickbait()}>
                    VÝSLEDKY<br/>
                    16. 5. 2026
                </Button>
                {photoAlbums.map((album) => (
                    <a
                        key={album.url}
                        href={album.url}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        className={'photo-link'}>
                        Fotky od {album.author} →
                    </a>
                ))}
            </Row>
        </>
    );
}
