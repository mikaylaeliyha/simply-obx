const storePhotos = [
    { image: "clothes.JPG", alt: "Rows of colorful Outer Banks shirts and apparel" },
    { image: "tshirts.png", alt: "Simply OBX graphic tees in a range of colors" },
    { image: "dresses.png", alt: "Colorful beach dresses and cover-ups" },
    { image: "hats2.png", alt: "A wall of Outer Banks baseball caps" },
    { image: "hats3.png", alt: "Beach hats, shirts, and sweatshirts in store" },
    { image: "hats4.png", alt: "Colorful sun hats and beachwear" },
    { image: "hats5.png", alt: "Rows of sun hats and beach accessories" },
    { image: "hats6.png", alt: "A colorful selection of bucket hats" },
    { image: "beachGear.png", alt: "Beach toys, buckets, and colorful beach gear" },
    { image: "beachstuff.png", alt: "Beach umbrellas, towels, and beach-day essentials" },
    { image: "flipflops.png", alt: "A full wall of flip-flops in many colors" },
    { image: "sandals.png", alt: "Sandals and flip-flops ready for the beach" },
    { image: "shoes.png", alt: "A selection of casual beach shoes and sandals" },
    { image: "goggles.png", alt: "Colorful swimming goggles and pool toys" },
    { image: "goggles2.png", alt: "Swimming goggles and water-play accessories" },
    { image: "snorkels.png", alt: "Snorkels, masks, and beach-day gear" },
    { image: "sunglasses.png", alt: "A colorful selection of sunglasses" },
    { image: "sunglasses2.png", alt: "Rows of sunglasses in the shop" },
    { image: "store2.png", alt: "A look across the apparel and beach gear shop" },
    { image: "indoors.JPG", alt: "The Simply OBX shop interior" },
    { image: "cashregister.png", alt: "Souvenirs and gifts displayed at the register" }
];

const arcadePhotos = [
    { image: "arcade.JPG", alt: "Inside the colorful X-Treme Arcade" },
    { image: "arcade1.png", alt: "Arcade cabinets and games at X-Treme Arcade" },
    { image: "arcade2.png", alt: "Air hockey and prize games in the arcade" },
    { image: "arcade3.png", alt: "A colorful row of arcade games" },
    { image: "arcade4.png", alt: "Arcade games glowing under neon lights" },
    { image: "arcade5.png", alt: "Arcade games and prize machines" },
    { image: "arcade6.png", alt: "The arcade prize counter and claw machines" },
    { image: "arcade7.png", alt: "A visitor playing a game at the arcade" },
    { image: "arcade8.png", alt: "Air hockey and arcade games" }
];

const vapePhotos = [
    { image: "vapeshop.png", alt: "Glassware, accessories, and products in the vape shop" },
    { image: "vapeshop2.png", alt: "Shelves of vape devices and accessories" },
    { image: "vapeshop3.png", alt: "A selection of vape shop products and accessories" },
    { image: "vapeshop4.png", alt: "Cigars, tobacco products, and accessories in store" }
];

const arcadePrompts = [
    "Find your new favorite game!",
    "Bring your best game face!",
    "A little friendly competition?",
    "Make time for one more round!"
];

const directionsUrl = "https://www.google.com/maps/search/?api=1&query=40194%20Tuna%20Terrace%2C%20Avon%2C%20NC%2027915";

function Header({ menuOpen, setMenuOpen }) {
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <div className="announcement"><span>Family run · Avon, North Carolina</span> — your little piece of the OBX</div>
            <header className="site-header">
                <a className="brand" href="index.html" aria-label="Simply OBX home">
                    <span className="brand-mark" aria-hidden="true">🐚</span> simply OBX
                </a>
                <button
                    className="button menu-toggle"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    Explore
                </button>
                <nav id="main-navigation" className="nav-links" aria-label="Main navigation">
                    <a href="index.html#shop" onClick={closeMenu}>What’s in store</a>
                    <a href="arcade.html" onClick={closeMenu}>X-Treme Arcade</a>
                    <a href="vape-shop.html" onClick={closeMenu}>Vape shop</a>
                    <a href="index.html#visit" onClick={closeMenu}>Find us</a>
                </nav>
            </header>
        </>
    );
}

function Footer() {
    return (
        <footer className="site-footer">
            <a className="brand" href="index.html"><span className="brand-mark" aria-hidden="true">🐚</span> simply OBX</a>
            <p>Family run, a one stop shop for all your OBX needs!</p>
            <p>Avon, North Carolina · <a href="tel:+12529950935">(252) 995-0935</a></p>
            <BackToTop />
        </footer>
    );
}

function PhotoGallery({ photos, className = "" }) {
    const [activeIndex, setActiveIndex] = React.useState(null);
    const closeButtonRef = React.useRef(null);
    const openerRef = React.useRef(null);

    React.useEffect(() => {
        if (activeIndex === null) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setActiveIndex(null);
            }
            if (event.key === "ArrowLeft") {
                setActiveIndex((current) => (current - 1 + photos.length) % photos.length);
            }
            if (event.key === "ArrowRight") {
                setActiveIndex((current) => (current + 1) % photos.length);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, photos.length]);

    React.useEffect(() => {
        if (activeIndex === null) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();
        return () => {
            document.body.style.overflow = previousOverflow;
            openerRef.current?.focus();
        };
    }, [activeIndex === null]);

    const closeGallery = () => {
        setActiveIndex(null);
        window.requestAnimationFrame(() => openerRef.current?.focus());
    };

    return (
        <>
        <div className={`photo-grid ${className}`}>
                {photos.map((photo, index) => (
                <figure className="photo-card" key={photo.image}>
                        <button
                            className="photo-open"
                            type="button"
                            aria-label={`Open image: ${photo.alt}`}
                            onClick={(event) => {
                                openerRef.current = event.currentTarget;
                                setActiveIndex(index);
                            }}
                        >
                    <img src={photo.image} alt={photo.alt} loading="lazy" />
                            <span className="photo-zoom" aria-hidden="true">View photo <span>↗</span></span>
                        </button>
                </figure>
            ))}
        </div>
            {activeIndex !== null && (
                <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${activeIndex + 1} of ${photos.length}`} onClick={closeGallery}>
                    <button
                        className="lightbox-close"
                        type="button"
                        aria-label="Close photo viewer"
                        onClick={closeGallery}
                        ref={closeButtonRef}
                    >×</button>
                    <button
                        className="lightbox-arrow lightbox-previous"
                        type="button"
                        aria-label="Previous photo"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
                        }}
                    >←</button>
                    <figure className="lightbox-content" onClick={(event) => event.stopPropagation()}>
                        <img src={photos[activeIndex].image} alt={photos[activeIndex].alt} />
                        <figcaption>{photos[activeIndex].alt} <span>{activeIndex + 1} / {photos.length}</span></figcaption>
                    </figure>
                    <button
                        className="lightbox-arrow lightbox-next"
                        type="button"
                        aria-label="Next photo"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveIndex((activeIndex + 1) % photos.length);
                        }}
                    >→</button>
                </div>
            )}
        </>
    );
}

function BackToTop() {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const updateVisibility = () => setVisible(window.scrollY > 400);
        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });
        return () => window.removeEventListener("scroll", updateVisibility);
    }, []);

    if (!visible) return null;

    return (
        <button
            className="back-to-top"
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
        >↑</button>
    );
}

function VisitCard() {
    return (
        <div className="visit-card">
            <h3>Simply OBX</h3>
            <p>40194 Tuna Terrace<br />Avon, NC 27915</p>
            <p>Questions? Give us a ring:<br /><a href="tel:+12529950935">(252) 995-0935</a></p>
            <a className="button button-sun" href="tel:+12529950935">Call the shop <span aria-hidden="true">↗</span></a>
            <a className="button button-light" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
        </div>
    );
}

function HomePage() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [spinning, setSpinning] = React.useState(false);
    const [rotation, setRotation] = React.useState(0);
    const [arcadeMessage, setArcadeMessage] = React.useState("Give it a spin for your next arcade idea.");

    const spinWheel = () => {
        if (spinning) return;
        setSpinning(true);
        setRotation((current) => current + 1440 + Math.random() * 720);
        setArcadeMessage(arcadePrompts[Math.floor(Math.random() * arcadePrompts.length)]);
        window.setTimeout(() => setSpinning(false), 3300);
    };

    return (
        <div className="page-wrap">
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <main>
                <section className="hero" id="home" aria-labelledby="hero-title">
                    <img className="hero-image" src="outsidepicture.png" alt="" />
                    <div className="hero-content">
                        <p className="eyebrow">A family-run Outer Banks shop</p>
                        <h1 id="hero-title">The coast looks good on you.</h1>
                        <p className="hero-copy">Find Outer Banks apparel, souvenirs, and beach gear, then stick around for X-Treme Arcade and our vape shop. We’d love to see you in Avon!</p>
                        <a className="button button-light" href="#shop">Take a peek in store <span aria-hidden="true">→</span></a>
                    </div>
                    <div className="hero-note" aria-hidden="true"><span>OBX</span> salt in<br />your hair</div>
                </section>

                <section className="intro" aria-labelledby="intro-title">
                    <p className="eyebrow">Good things, this way <span className="shell" aria-hidden="true">✳</span></p>
                    <h2 id="intro-title">Your happy place, <em>in store.</em></h2>
                    <p>We’re a family-run business offering a wide selection of Outer Banks apparel, souvenirs, and beach gear, plus X-Treme Arcade and a vape shop. Stop in, say hello, and find a little something for your beach day.</p>
                </section>

                <section className="shop-section" id="shop" aria-labelledby="shop-title">
                    <div className="shop-banner">
                        <span className="shop-status">Online shop under construction</span>
                        <p>For now, this is just a little look at what you’ll find when you visit us in store.</p>
                    </div>
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">A little something for your trip</p>
                            <h2 id="shop-title">What’s in store.</h2>
                        </div>
                        <p>Come see us in Avon to browse our full selection.</p>
                    </div>
                    <PhotoGallery photos={storePhotos} className="store-gallery" />
                    <div className="coming-soon">
                        <div className="candy-photo-frame">
                            <img className="candy-photo" src="candy.JPG" alt="Colorful candy jars in the new candy section" />
                        </div>
                        <div><p className="eyebrow">A sweet new treat</p><h3>Candy is coming soon!</h3></div>
                        <span className="coming-soon-label">Coming soon</span>
                    </div>
                    <p className="pricing-note">Photos show examples of items and displays at our store; selection may vary. No online ordering or checkout is available yet.</p>
                </section>

                <section className="arcade-section" id="arcade" aria-labelledby="arcade-title">
                    <div className="arcade-copy">
                        <p className="eyebrow">A little extra fun</p>
                        <h2 id="arcade-title">X-Treme Arcade is here!</h2>
                        <p>There’s an arcade right here at Simply OBX! Bring the whole crew, challenge your vacation rival, and make a few more memories between beach days. Make sure to stop by and check it out—we’d love to see you.</p>
                        <div className="arcade-actions">
                            <a className="button" href="arcade.html">Explore the arcade <span aria-hidden="true">→</span></a>
                            <a className="button button-outline" href="tel:+12529950935">Call the shop</a>
                        </div>
                    </div>
                </section>

                <section className="business-links" aria-label="Explore more at Simply OBX">
                    <a className="business-link" href="arcade.html">
                        <img src="arcade.png" alt="" loading="lazy" />
                        <span>Visit X-Treme Arcade <span aria-hidden="true">→</span></span>
                    </a>
                    <a className="business-link" href="vape-shop.html">
                        <img src="vapeshop3.png" alt="" loading="lazy" />
                        <span>Explore the vape shop <span aria-hidden="true">→</span></span>
                    </a>
                </section>

                <section className="visit-section" id="visit" aria-labelledby="visit-title">
                    <div className="visit-inner">
                        <div>
                            <p className="eyebrow">Find your way to the fun</p>
                            <h2 id="visit-title">See you by the sea.</h2>
                            <p className="visit-copy">We’re easy to find in Avon. Swing by for a browse, bring the family to X-Treme Arcade, or give us a call before you head over.</p>
                            <img className="visit-photo" src="dogoutsideofstore.png" alt="A friendly visitor outside Simply OBX and X-Treme Arcade" loading="lazy" />
                        </div>
                        <VisitCard />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function ArcadePage() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className="page-wrap">
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <main className="interior-main">
                <section className="interior-hero arcade-hero" aria-labelledby="page-title">
                    <img src="arcade.JPG" alt="Bright lights and arcade machines at X-Treme Arcade" />
                    <div className="interior-hero-copy">
                        <p className="eyebrow">Play a little longer</p>
                        <h1 id="page-title">X-Treme Arcade</h1>
                        <p>Make room for one more round. Bring your crew to our Avon arcade for bright lights, friendly competition, and prizes to take home.</p>
                        <a className="button button-light" href="#games">See the arcade <span aria-hidden="true">↓</span></a>
                    </div>
                </section>
                <section className="page-intro arcade-intro">
                    <p className="eyebrow">Games, prizes & good times</p>
                    <h2>Your beach-day bonus round.</h2>
                    <p>From head-to-head games to prize machines, there’s plenty to explore. The photos below give you a peek at the games and arcade floor; machine selection and availability can change.</p>
                </section>
                <section className="game-highlights" id="games" aria-labelledby="games-title">
                    <div className="section-heading">
                        <div><p className="eyebrow">Pick your next challenge</p><h2 id="games-title">A little something for every player.</h2></div>
                    </div>
                    <div className="game-list">
                        <article><span aria-hidden="true">01</span><h3>Air hockey</h3><p>Go head-to-head and see who gets the winning shot.</p></article>
                        <article><span aria-hidden="true">02</span><h3>Arcade & video games</h3><p>Bright screens, quick rounds, and lots of ways to play.</p></article>
                        <article><span aria-hidden="true">03</span><h3>Prize & redemption games</h3><p>Try your luck, collect tickets, and choose a prize.</p></article>
                        <article><span aria-hidden="true">04</span><h3>Sports & skill games</h3><p>Challenge your friends to a little friendly competition.</p></article>
                    </div>
                    <PhotoGallery photos={arcadePhotos} className="arcade-gallery" />
                </section>
                <section className="visit-section">
                    <div className="visit-inner">
                        <div><p className="eyebrow">Your next round is in Avon</p><h2>Come visit X-Treme Arcade.</h2><p className="visit-copy">Stop by Simply OBX at 40194 Tuna Terrace in Avon. Call ahead for current hours or to ask about the arcade.</p></div>
                        <VisitCard />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function VapeShopPage() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className="page-wrap">
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <main className="interior-main vape-main">
                <section className="interior-hero vape-hero" aria-labelledby="page-title">
                    <img src="vapeshop3.png" alt="Vape Shop sign and product illustration" />
                    <div className="interior-hero-copy">
                        <p className="eyebrow">An in-store department at Simply OBX</p>
                        <h1 id="page-title">The vape shop.</h1>
                        <p>Browse our in-store selection of vaping products, accessories, and more at our Avon location.</p>
                        <a className="button button-light" href="#selection">See the in-store selection <span aria-hidden="true">↓</span></a>
                    </div>
                </section>
                <section className="age-notice" aria-label="Age restriction">
                    <span className="age-mark">21+</span>
                    <div><h2>Adults only</h2><p>Must be 21 or older to enter the vape shop or purchase age-restricted products. Valid photo ID is required. We do not sell these products online.</p></div>
                </section>
                <section className="vape-selection" id="selection" aria-labelledby="selection-title">
                    <div className="section-heading">
                        <div><p className="eyebrow">A look at what’s in store</p><h2 id="selection-title">Visit us to browse.</h2></div>
                        <p>Product selection may vary. Call or stop in to ask about current availability.</p>
                    </div>
                    <div className="vape-categories">
                        <article><span aria-hidden="true">01</span><h3>Vape devices & supplies</h3><p>Explore the in-store assortment of devices and vaping supplies.</p></article>
                        <article><span aria-hidden="true">02</span><h3>Glassware & accessories</h3><p>Browse the glassware and accessories available in store.</p></article>
                        <article><span aria-hidden="true">03</span><h3>Tobacco products</h3><p>Ask us in person about the current tobacco and cigar selection.</p></article>
                    </div>
                    <PhotoGallery photos={vapePhotos} className="vape-gallery" />
                    <p className="pricing-note">For adults 21+ only. ID is required for age-restricted purchases. No online ordering, prices, or shipping are offered on this site.</p>
                </section>
                <section className="visit-section">
                    <div className="visit-inner">
                        <div><p className="eyebrow">Visit us in Avon</p><h2>Stop by the shop.</h2><p className="visit-copy">Our vape shop is inside Simply OBX at 40194 Tuna Terrace, Avon, NC. Call us with questions about current in-store selection.</p></div>
                        <VisitCard />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

const page = document.body.dataset.page;
const Page = page === "arcade" ? ArcadePage : page === "vape" ? VapeShopPage : HomePage;

ReactDOM.createRoot(document.getElementById("root")).render(<Page />);
