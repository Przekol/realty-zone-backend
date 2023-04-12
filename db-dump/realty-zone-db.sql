--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: users_roles_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.users_roles_enum AS ENUM (
    '0',
    '1'
);


ALTER TYPE public.users_roles_enum OWNER TO admin;

--
-- Name: users_status_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.users_status_enum AS ENUM (
    '0',
    '1',
    '2'
);


ALTER TYPE public.users_status_enum OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.addresses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    street character varying NOT NULL,
    street_number character varying NOT NULL,
    flat_number character varying NOT NULL,
    zip_code character varying NOT NULL,
    city character varying NOT NULL,
    district character varying NOT NULL,
    country character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.addresses OWNER TO admin;

--
-- Name: dictionary_markets; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.dictionary_markets (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.dictionary_markets OWNER TO admin;

--
-- Name: dictionary_markets_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.dictionary_markets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dictionary_markets_id_seq OWNER TO admin;

--
-- Name: dictionary_markets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.dictionary_markets_id_seq OWNED BY public.dictionary_markets.id;


--
-- Name: dictionary_ownerships; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.dictionary_ownerships (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.dictionary_ownerships OWNER TO admin;

--
-- Name: dictionary_ownerships_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.dictionary_ownerships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dictionary_ownerships_id_seq OWNER TO admin;

--
-- Name: dictionary_ownerships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.dictionary_ownerships_id_seq OWNED BY public.dictionary_ownerships.id;


--
-- Name: dictionary_statuses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.dictionary_statuses (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.dictionary_statuses OWNER TO admin;

--
-- Name: dictionary_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.dictionary_statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dictionary_statuses_id_seq OWNER TO admin;

--
-- Name: dictionary_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.dictionary_statuses_id_seq OWNED BY public.dictionary_statuses.id;


--
-- Name: dictionary_transactions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.dictionary_transactions (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.dictionary_transactions OWNER TO admin;

--
-- Name: dictionary_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.dictionary_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dictionary_transactions_id_seq OWNER TO admin;

--
-- Name: dictionary_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.dictionary_transactions_id_seq OWNED BY public.dictionary_transactions.id;


--
-- Name: dictionary_types; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.dictionary_types (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.dictionary_types OWNER TO admin;

--
-- Name: dictionary_types_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.dictionary_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dictionary_types_id_seq OWNER TO admin;

--
-- Name: dictionary_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.dictionary_types_id_seq OWNED BY public.dictionary_types.id;


--
-- Name: offers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.offers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    offer_number integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    price integer NOT NULL,
    area integer NOT NULL,
    rooms integer NOT NULL,
    floor integer NOT NULL,
    building_floors integer NOT NULL,
    construction_year integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    market integer,
    transaction integer,
    ownership integer,
    type integer,
    status integer,
    user_id uuid
);


ALTER TABLE public.offers OWNER TO admin;

--
-- Name: offers_addresses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.offers_addresses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    offer_id uuid,
    address_id uuid
);


ALTER TABLE public.offers_addresses OWNER TO admin;

--
-- Name: offers_photos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.offers_photos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    offer_id uuid
);


ALTER TABLE public.offers_photos OWNER TO admin;

--
-- Name: photos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.photos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    url character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    offer_photos_id uuid
);


ALTER TABLE public.photos OWNER TO admin;

--
-- Name: tokens_activation; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tokens_activation (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    hash_token character varying NOT NULL,
    is_used boolean DEFAULT false NOT NULL,
    expires_in bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid
);


ALTER TABLE public.tokens_activation OWNER TO admin;

--
-- Name: tokens_password_reset; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tokens_password_reset (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    hash_token character varying NOT NULL,
    is_used boolean DEFAULT false NOT NULL,
    expires_in bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid
);


ALTER TABLE public.tokens_password_reset OWNER TO admin;

--
-- Name: tokens_refresh; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tokens_refresh (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    hash_token character varying NOT NULL,
    is_used boolean DEFAULT false NOT NULL,
    expires_in bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid
);


ALTER TABLE public.tokens_refresh OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    hash_pwd character varying NOT NULL,
    status public.users_status_enum DEFAULT '0'::public.users_status_enum NOT NULL,
    roles public.users_roles_enum[] DEFAULT '{0}'::public.users_roles_enum[] NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_addresses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users_addresses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    address_id uuid
);


ALTER TABLE public.users_addresses OWNER TO admin;

--
-- Name: users_profiles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users_profiles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50),
    first_name character varying(50),
    last_name character varying(50),
    phone_number character varying(15),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    avatar_id uuid,
    user_id uuid
);


ALTER TABLE public.users_profiles OWNER TO admin;

--
-- Name: dictionary_markets id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_markets ALTER COLUMN id SET DEFAULT nextval('public.dictionary_markets_id_seq'::regclass);


--
-- Name: dictionary_ownerships id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_ownerships ALTER COLUMN id SET DEFAULT nextval('public.dictionary_ownerships_id_seq'::regclass);


--
-- Name: dictionary_statuses id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_statuses ALTER COLUMN id SET DEFAULT nextval('public.dictionary_statuses_id_seq'::regclass);


--
-- Name: dictionary_transactions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_transactions ALTER COLUMN id SET DEFAULT nextval('public.dictionary_transactions_id_seq'::regclass);


--
-- Name: dictionary_types id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_types ALTER COLUMN id SET DEFAULT nextval('public.dictionary_types_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.addresses (id, street, street_number, flat_number, zip_code, city, district, country, created_at, updated_at) FROM stdin;
38a8a595-6f3c-4ba7-83ed-eed6ae6c0447	Złota	4	45	00-002	Warszawa	Śródmieście	Polska	2023-04-12 17:44:17.860833	2023-04-12 17:44:17.860833
7da375a4-d9f0-433d-9b33-1e726735e8c0	Srebrna	4	2	02-022	Warszawa	Śródmieście	Polska	2023-04-12 17:48:55.925228	2023-04-12 17:48:55.925228
49a8f9a0-6cd0-4940-a024-e0c3cc5487fd	Słoneczna	12A	3	03-001	Warszawa	Białołęka	Polska	2023-04-12 18:37:18.296447	2023-04-12 18:37:18.296447
\.


--
-- Data for Name: dictionary_markets; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.dictionary_markets (id, name) FROM stdin;
51	Pierwotny
52	Wtórny
\.


--
-- Data for Name: dictionary_ownerships; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.dictionary_ownerships (id, name) FROM stdin;
21	Pełna własność
22	Spółdzielcze własnościowe prawo do lokalu
23	Udział
\.


--
-- Data for Name: dictionary_statuses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.dictionary_statuses (id, name) FROM stdin;
41	Aktywna
42	Nieaktywna
\.


--
-- Data for Name: dictionary_transactions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.dictionary_transactions (id, name) FROM stdin;
11	Sprzedaż
12	Wynajem
\.


--
-- Data for Name: dictionary_types; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.dictionary_types (id, name) FROM stdin;
31	Mieszkanie
32	Dom
33	Działka
34	Lokal użytkowy
\.


--
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.offers (id, offer_number, title, description, price, area, rooms, floor, building_floors, construction_year, created_at, updated_at, market, transaction, ownership, type, status, user_id) FROM stdin;
bd24fc03-db56-4419-8978-ee02ee8ed2c8	13214541	Nowoczesny apartament w centrum miasta	Ciesząc się doskonałą lokalizacją w sercu Warszawy, na ulicy Złotej, prezentujemy Państwu przestronne, nowoczesne i eleganckie mieszkanie o powierzchni 75 m². Nieruchomość znajduje się na 4. piętrze w nowym, wysokiej klasy budynku z windą i ochroną 24/7.\n\nMieszkanie składa się z przestronnego salonu z otwartym aneksem kuchennym, dwóch urokliwych sypialni, komfortowej łazienki, oddzielnej toalety oraz funkcjonalnego przedpokoju.\n\nSalon z aneksem kuchennym jest wyjątkowo jasny i przestronny, dzięki dużym oknom oraz dostępowi do balkonu z widokiem na miasto. Kuchnia jest w pełni wyposażona w nowoczesne sprzęty AGD, takie jak płyta indukcyjna, piekarnik, lodówka, zmywarka, a także stylowe meble i wygodne blaty robocze.\n\nObie sypialnie mają wygodne łóżka, dużo miejsca do przechowywania oraz miękkie oświetlenie. Łazienka wyposażona jest w wannę, prysznic, umywalkę oraz szafki. W przedpokoju znajduje się duża szafa wnękowa oraz miejsce na wieszanie ubrań.\n\nMieszkanie jest wykończone z dbałością o szczegóły, z wykorzystaniem wysokiej jakości materiałów. Podłogi wyłożone są jasnym, naturalnym drewnem, a ściany są gładko malowane w neutralnych kolorach.\n\nDodatkowe udogodnienia obejmują klimatyzację, ogrzewanie podłogowe, wideofon oraz miejsce postojowe w garażu podziemnym.\n\nUl. Złota to jedna z najbardziej prestiżowych ulic w Warszawie, otoczona licznymi restauracjami, kawiarniami, sklepami oraz atrakcjami kulturalnymi. W pobliżu znajdują się również liczne przystanki komunikacji miejskiej, co zapewnia doskonałe połączenia z resztą miasta.\n\nPodsumowując, mieszkanie przy ul. Złotej w Warszawie to doskonałe miejsce dla osób ceniących komfort, nowoczesność oraz bliskość centrum miasta.	3000000	75	3	4	20	2015	2023-04-12 17:44:17.885488	2023-04-12 17:44:17.885488	52	11	21	31	41	8d40cbbd-ed25-477a-9c19-64167a9ee7a2
1a62a367-e0b8-416b-accb-5807a8f406ba	13217307	Idealne dla Rodziny w Centrum Warszawy	Zapraszamy do zapoznania się z ofertą wynajmu przestronnego, świetnie zaprojektowanego mieszkania o powierzchni 110 m², usytuowanego na ul. Srebrnej w Warszawie. Mieszkanie znajduje się na 3. piętrze w kameralnym, eleganckim budynku z windą i monitoringiem.\n\nMieszkanie składa się z urokliwego salonu, oddzielnej, w pełni wyposażonej kuchni, trzech sypialni, dwóch łazienek oraz przestronnego przedpokoju. Dodatkowym atutem jest zaciszna loggia, która pozwala cieszyć się widokiem na zielone otoczenie.\n\nSalon urządzony jest w sposób nowoczesny, z wygodnymi meblami, stolikiem kawowym, telewizorem oraz jadalnią z miejscem dla 6 osób. Kuchnia wyposażona jest w eleganckie meble, sprzęty AGD (lodówka, piekarnik, płyta gazowa, zmywarka), a także wygodną wyspę roboczą.\n\nTrzy sypialnie mieszczą wygodne łóżka, przestronne szafy oraz biurka, co pozwala na komfortowe i funkcjonalne wykorzystanie przestrzeni. Jedna z łazienek wyposażona jest w prysznic, druga natomiast w wannę z hydromasażem, umywalkę oraz szafki na kosmetyki.\n\nW przedpokoju znajduje się duża szafa wnękowa oraz dodatkowe miejsce do przechowywania. Mieszkanie jest wykończone z dbałością o każdy szczegół, z wysokiej jakości materiałów, takich jak drewniane podłogi, eleganckie płytki ceramiczne i stylowe oświetlenie.\n\nMieszkanie posiada centralne ogrzewanie, klimatyzację oraz szybki dostęp do internetu. Do dyspozycji najemców jest również miejsce postojowe w garażu podziemnym.\n\nUl. Srebrna to spokojna, zielona okolica, z dogodnym dostępem do licznych sklepów, restauracji, kawiarni oraz przystanków komunikacji miejskiej. W pobliżu znajdują się parki oraz trasy spacerowe, co sprawia, że mieszkanie jest idealne dla osób ceniących spokój oraz bliskość natury, a jednocześnie szybki dojazd do centrum miasta.	1205500	110	4	3	7	1985	2023-04-12 17:48:55.954256	2023-04-12 17:48:55.954256	52	11	22	31	41	8d40cbbd-ed25-477a-9c19-64167a9ee7a2
d0a48d4a-cc1a-4c89-9548-833f57cee14a	13246370	Przestronne mieszkanie w samym bliskiej dzielnicy Warszawy	Zapraszamy do zakupu komfortowego, 80 m² mieszkania położonego na 2. piętrze 10-piętrowego budynku z 2010 roku przy Przykładowej ulicy 12A w Warszawie. Nieruchomość posiada trzy pokoje, w tym przestronny salon z jadalnią oraz dwie sypialnie. Mieszkanie jest w pełni wyposażone i doskonale zlokalizowane w dzielnicy Śródmieście. Cieszy się bliskością licznych sklepów, restauracji i atrakcji kulturalnych. Mieszkanie jest dostępne w atrakcyjnej cenie 500 000 PLN.	500000	80	3	2	10	2010	2023-04-12 18:37:18.341009	2023-04-12 18:37:18.341009	51	11	21	31	41	37206b8e-f958-44f2-a21b-99391517cbde
\.


--
-- Data for Name: offers_addresses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.offers_addresses (id, offer_id, address_id) FROM stdin;
5b950f45-ea4c-4151-99ff-4fb0457eac74	bd24fc03-db56-4419-8978-ee02ee8ed2c8	38a8a595-6f3c-4ba7-83ed-eed6ae6c0447
192ee1a1-9381-42f1-a7a1-bc6222f31c23	1a62a367-e0b8-416b-accb-5807a8f406ba	7da375a4-d9f0-433d-9b33-1e726735e8c0
260ef052-48e0-4e72-9530-32ebdf45a3f3	d0a48d4a-cc1a-4c89-9548-833f57cee14a	49a8f9a0-6cd0-4940-a024-e0c3cc5487fd
\.


--
-- Data for Name: offers_photos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.offers_photos (id, offer_id) FROM stdin;
1829fb01-0c36-4ba8-a7ff-d64841946298	bd24fc03-db56-4419-8978-ee02ee8ed2c8
66573664-c39b-483e-b70e-c69a1375a7e4	1a62a367-e0b8-416b-accb-5807a8f406ba
5ae4201c-d928-4f06-a1f4-74c9a509f7a0	d0a48d4a-cc1a-4c89-9548-833f57cee14a
\.


--
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.photos (id, url, created_at, updated_at, offer_photos_id) FROM stdin;
bb19df0d-b2ee-4c11-bd77-64b6c7ca49d3	8d40cbbd-ed25-477a-9c19-64167a9ee7a2_1681321131180_10a2f8b6.jpg	2023-04-12 17:38:51.294538	2023-04-12 17:38:51.294538	\N
ca47622d-4b4a-4a02-b97c-57079eef52fa	13214541_1681321565286_6692cdac.jpg	2023-04-12 17:46:05.355384	2023-04-12 17:46:05.43679	1829fb01-0c36-4ba8-a7ff-d64841946298
67b0a019-926e-4d83-a32e-5827f949b1e3	13214541_1681321565289_535b4492.jpg	2023-04-12 17:46:05.36974	2023-04-12 17:46:05.43679	1829fb01-0c36-4ba8-a7ff-d64841946298
026119e8-21fb-4cdb-a1e9-f1a33aa1391b	13214541_1681321565291_01f426da.jpg	2023-04-12 17:46:05.369181	2023-04-12 17:46:05.43679	1829fb01-0c36-4ba8-a7ff-d64841946298
ddf3bc2c-2e97-4ff3-8c8b-c211d2113dd8	13214541_1681321565292_7e1cf4cf.jpg	2023-04-12 17:46:05.372751	2023-04-12 17:46:05.43679	1829fb01-0c36-4ba8-a7ff-d64841946298
4d50ad1b-e772-40e3-9021-cabd07fa8283	13217307_1681321807354_fc69ab83.jpg	2023-04-12 17:50:07.414212	2023-04-12 17:50:07.446435	66573664-c39b-483e-b70e-c69a1375a7e4
3cb087fe-278e-4be1-8df8-4c466fc283ae	13217307_1681321807355_2477cc7c.jpg	2023-04-12 17:50:07.426118	2023-04-12 17:50:07.446435	66573664-c39b-483e-b70e-c69a1375a7e4
b2a64162-df9e-4c15-b4e9-108fd31545c0	13217307_1681321807358_d33b5809.jpg	2023-04-12 17:50:07.425488	2023-04-12 17:50:07.446435	66573664-c39b-483e-b70e-c69a1375a7e4
c778d4a7-371c-433d-a551-c21b3baf0e3b	13217307_1681321807360_4f274d9e.jpg	2023-04-12 17:50:07.428822	2023-04-12 17:50:07.446435	66573664-c39b-483e-b70e-c69a1375a7e4
204febf2-cddc-4fdf-8559-3e4952de0807	37206b8e-f958-44f2-a21b-99391517cbde_1681324409288_716f838a.jpg	2023-04-12 18:33:29.422953	2023-04-12 18:33:29.422953	\N
e5a59d27-8eb4-4236-a0c3-5dd7eb3c009b	13246370_1681324764472_75ba3b3c.jpg	2023-04-12 18:39:24.500929	2023-04-12 18:39:24.590477	5ae4201c-d928-4f06-a1f4-74c9a509f7a0
cce3f809-26ba-4576-a88d-43a79903333f	13246370_1681324764477_c5183dc2.jpg	2023-04-12 18:39:24.513318	2023-04-12 18:39:24.590477	5ae4201c-d928-4f06-a1f4-74c9a509f7a0
220eb0e1-aae2-4b94-9fe0-09c51535de6c	13246370_1681324764479_2fef0b49.jpg	2023-04-12 18:39:24.523278	2023-04-12 18:39:24.590477	5ae4201c-d928-4f06-a1f4-74c9a509f7a0
1d7a3632-059d-47ba-9384-7ceef874f7d8	13246370_1681324764483_8e82b89f.jpg	2023-04-12 18:39:24.513877	2023-04-12 18:39:24.590477	5ae4201c-d928-4f06-a1f4-74c9a509f7a0
\.


--
-- Data for Name: tokens_activation; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tokens_activation (id, hash_token, is_used, expires_in, created_at, updated_at, user_id) FROM stdin;
6171e27c-58c1-47f8-a000-576e0487f872	$2b$10$Ycbvp9SNVEpxpQkRKP7kKewJzTm0M4VyNjaz6PSmkarIbnkjiW8Q6	t	1681324641533	2023-04-12 17:37:21.533212	2023-04-12 17:37:41.341359	8d40cbbd-ed25-477a-9c19-64167a9ee7a2
97cb9173-8d50-47f8-8cf8-97ef7a65e714	$2b$10$6/XtsqXAb.0Wz/MGsChj0OcwZCyXRSH4nL4Ez1.xLIMnQV5vX4Re6	t	1681327623895	2023-04-12 18:27:03.895675	2023-04-12 18:27:48.313654	37206b8e-f958-44f2-a21b-99391517cbde
\.


--
-- Data for Name: tokens_password_reset; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tokens_password_reset (id, hash_token, is_used, expires_in, created_at, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: tokens_refresh; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tokens_refresh (id, hash_token, is_used, expires_in, created_at, updated_at, user_id) FROM stdin;
54e20924-a921-4f4c-a285-ba22afeebfbd	$2b$10$ILomwqJFBIeQYlKX9bQvNOJcUsInBVB//BTAt.Y07aCcdqVdwjITq	t	1681357076974	2023-04-12 17:37:56.974108	2023-04-12 17:48:55.70132	8d40cbbd-ed25-477a-9c19-64167a9ee7a2
ab431b36-e36b-4481-8306-27b7be1a89a9	$2b$10$qMMg1Y30MKNxaWMmYy0cZuf.04oNK9NsnRlqs2gh6GCpfwltO9P6S	t	1681357735816	2023-04-12 17:48:55.816692	2023-04-12 17:50:55.562262	8d40cbbd-ed25-477a-9c19-64167a9ee7a2
a35c4d12-b1f6-4285-901d-b1332dc4c515	$2b$10$2ZLLogJIUU28TBrg/irMEeKohog5MY9BtSeQ2GSP6TGj2fOh5jnuG	t	1681360090659	2023-04-12 18:28:10.658799	2023-04-12 18:39:20.040938	37206b8e-f958-44f2-a21b-99391517cbde
fbb827bd-121d-4d21-8f90-a9e3acdf2d6d	$2b$10$Ts/PizZh7qy.BtdPtAmukOnDGWh8U14vxW60gJnD9XoNsUA29v1ii	f	1681360760113	2023-04-12 18:39:20.113575	2023-04-12 18:39:20.113575	37206b8e-f958-44f2-a21b-99391517cbde
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, email, hash_pwd, status, roles, created_at, updated_at) FROM stdin;
8d40cbbd-ed25-477a-9c19-64167a9ee7a2	przemyslaw.r.wojciechowski@gmail.com	$2b$10$0kl2tSFyZe/S62EAR1um9erh5CvsZ4lWRWoC/X2zs1lblvC4/suHe	1	{0}	2023-04-12 17:37:21.473462	2023-04-12 17:37:41.33287
37206b8e-f958-44f2-a21b-99391517cbde	jakubkrol@megak.pl	$2b$10$FWFoeWtGVAugGVXkKvOTHOvt1dYZVQ6InabFLxyJzORd4Ub9dQDqW	1	{0}	2023-04-12 18:27:03.81241	2023-04-12 18:27:48.256884
\.


--
-- Data for Name: users_addresses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users_addresses (id, user_id, address_id) FROM stdin;
\.


--
-- Data for Name: users_profiles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users_profiles (id, username, first_name, last_name, phone_number, created_at, updated_at, avatar_id, user_id) FROM stdin;
3efbdb55-cd17-49e6-8f6b-c4cdb1600793	Przekol	Przemysław	Wojciechowski	789170056	2023-04-12 17:37:41.394487	2023-04-12 17:37:41.394487	bb19df0d-b2ee-4c11-bd77-64b6c7ca49d3	8d40cbbd-ed25-477a-9c19-64167a9ee7a2
2524fa1e-99cc-4b35-8e43-bdb39615fcf1	Ami777	Jakub	Król	500500500	2023-04-12 18:27:48.323772	2023-04-12 18:27:48.323772	204febf2-cddc-4fdf-8559-3e4952de0807	37206b8e-f958-44f2-a21b-99391517cbde
\.


--
-- Name: dictionary_markets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.dictionary_markets_id_seq', 1, false);


--
-- Name: dictionary_ownerships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.dictionary_ownerships_id_seq', 1, false);


--
-- Name: dictionary_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.dictionary_statuses_id_seq', 1, false);


--
-- Name: dictionary_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.dictionary_transactions_id_seq', 1, false);


--
-- Name: dictionary_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.dictionary_types_id_seq', 1, false);


--
-- Name: dictionary_transactions PK_1dca0f1ff2b90e381a2d0485f12; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_transactions
    ADD CONSTRAINT "PK_1dca0f1ff2b90e381a2d0485f12" PRIMARY KEY (id);


--
-- Name: dictionary_types PK_2da961d3113d536dd77de5972b8; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_types
    ADD CONSTRAINT "PK_2da961d3113d536dd77de5972b8" PRIMARY KEY (id);


--
-- Name: users_addresses PK_2f8d527df0d3acb8aa51945a968; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "PK_2f8d527df0d3acb8aa51945a968" PRIMARY KEY (id);


--
-- Name: offers PK_4c88e956195bba85977da21b8f4; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY (id);


--
-- Name: photos PK_5220c45b8e32d49d767b9b3d725; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY (id);


--
-- Name: tokens_password_reset PK_59f8bd34c27eb4a32181b14c2d5; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_password_reset
    ADD CONSTRAINT "PK_59f8bd34c27eb4a32181b14c2d5" PRIMARY KEY (id);


--
-- Name: offers_addresses PK_5d05072e90452ef0ab205f78fda; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_addresses
    ADD CONSTRAINT "PK_5d05072e90452ef0ab205f78fda" PRIMARY KEY (id);


--
-- Name: dictionary_ownerships PK_62409a2f69f0277ca2e335d90f9; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_ownerships
    ADD CONSTRAINT "PK_62409a2f69f0277ca2e335d90f9" PRIMARY KEY (id);


--
-- Name: tokens_refresh PK_65e1ecc3e7de74c4dd09b44d883; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_refresh
    ADD CONSTRAINT "PK_65e1ecc3e7de74c4dd09b44d883" PRIMARY KEY (id);


--
-- Name: addresses PK_745d8f43d3af10ab8247465e450; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY (id);


--
-- Name: dictionary_statuses PK_75414a0eb6af75063d7cba7caef; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_statuses
    ADD CONSTRAINT "PK_75414a0eb6af75063d7cba7caef" PRIMARY KEY (id);


--
-- Name: offers_photos PK_89016ce6125b2399e39304cebde; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_photos
    ADD CONSTRAINT "PK_89016ce6125b2399e39304cebde" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: dictionary_markets PK_a4ade6b1b4fbf40eb0f4bdb65c2; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.dictionary_markets
    ADD CONSTRAINT "PK_a4ade6b1b4fbf40eb0f4bdb65c2" PRIMARY KEY (id);


--
-- Name: tokens_activation PK_dccbfb5ab05e002ea00adca09ca; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_activation
    ADD CONSTRAINT "PK_dccbfb5ab05e002ea00adca09ca" PRIMARY KEY (id);


--
-- Name: users_profiles PK_e7a7f7db3fc96700d9239e43cda; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT "PK_e7a7f7db3fc96700d9239e43cda" PRIMARY KEY (id);


--
-- Name: offers_photos REL_0a268c9ba75a097f5f79959dc1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_photos
    ADD CONSTRAINT "REL_0a268c9ba75a097f5f79959dc1" UNIQUE (offer_id);


--
-- Name: users_profiles REL_181a055631e557898c3eea0f37; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT "REL_181a055631e557898c3eea0f37" UNIQUE (user_id);


--
-- Name: offers_addresses REL_20bbf99ea0f2c8d07444cd7a72; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_addresses
    ADD CONSTRAINT "REL_20bbf99ea0f2c8d07444cd7a72" UNIQUE (address_id);


--
-- Name: users_addresses REL_74de4f43d79bc7d7cb5c20d770; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "REL_74de4f43d79bc7d7cb5c20d770" UNIQUE (address_id);


--
-- Name: users_profiles REL_9b2591ba6e4a0b1e3f46e7f030; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT "REL_9b2591ba6e4a0b1e3f46e7f030" UNIQUE (avatar_id);


--
-- Name: users_addresses REL_a6de63ed9c7d202b9cadae024d; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "REL_a6de63ed9c7d202b9cadae024d" UNIQUE (user_id);


--
-- Name: offers_addresses REL_fc6d19aabe26ff1c6929f8a6e7; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_addresses
    ADD CONSTRAINT "REL_fc6d19aabe26ff1c6929f8a6e7" UNIQUE (offer_id);


--
-- Name: tokens_activation UQ_7b78cdc051bf862c2ca32144938; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_activation
    ADD CONSTRAINT "UQ_7b78cdc051bf862c2ca32144938" UNIQUE (hash_token);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: tokens_refresh UQ_df96ce9c4584d361248a247514e; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_refresh
    ADD CONSTRAINT "UQ_df96ce9c4584d361248a247514e" UNIQUE (hash_token);


--
-- Name: tokens_password_reset UQ_ee6d724553edc9b4b788d2ee5c0; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_password_reset
    ADD CONSTRAINT "UQ_ee6d724553edc9b4b788d2ee5c0" UNIQUE (hash_token);


--
-- Name: offers_photos FK_0a268c9ba75a097f5f79959dc19; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_photos
    ADD CONSTRAINT "FK_0a268c9ba75a097f5f79959dc19" FOREIGN KEY (offer_id) REFERENCES public.offers(id);


--
-- Name: offers FK_0e9637a96760a27dd3ed8803d2a; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "FK_0e9637a96760a27dd3ed8803d2a" FOREIGN KEY (market) REFERENCES public.dictionary_markets(id);


--
-- Name: photos FK_143c58866da85ccd10c88e157e0; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT "FK_143c58866da85ccd10c88e157e0" FOREIGN KEY (offer_photos_id) REFERENCES public.offers_photos(id);


--
-- Name: tokens_password_reset FK_16363dbb2338a377357f6627110; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_password_reset
    ADD CONSTRAINT "FK_16363dbb2338a377357f6627110" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users_profiles FK_181a055631e557898c3eea0f37e; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT "FK_181a055631e557898c3eea0f37e" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: offers_addresses FK_20bbf99ea0f2c8d07444cd7a722; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_addresses
    ADD CONSTRAINT "FK_20bbf99ea0f2c8d07444cd7a722" FOREIGN KEY (address_id) REFERENCES public.addresses(id);


--
-- Name: offers FK_2547a43d7409b85f70d4469c23a; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "FK_2547a43d7409b85f70d4469c23a" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: tokens_refresh FK_38f43302e47384b0fb007a7b433; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_refresh
    ADD CONSTRAINT "FK_38f43302e47384b0fb007a7b433" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: offers FK_434239966cb60e2dbc6178f9938; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "FK_434239966cb60e2dbc6178f9938" FOREIGN KEY (status) REFERENCES public.dictionary_statuses(id);


--
-- Name: users_addresses FK_74de4f43d79bc7d7cb5c20d7705; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "FK_74de4f43d79bc7d7cb5c20d7705" FOREIGN KEY (address_id) REFERENCES public.addresses(id);


--
-- Name: offers FK_8101f7169d0e4bf3695de1c4eb1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "FK_8101f7169d0e4bf3695de1c4eb1" FOREIGN KEY (type) REFERENCES public.dictionary_types(id);


--
-- Name: offers FK_9ae9eaacc9554abf18859de53b8; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "FK_9ae9eaacc9554abf18859de53b8" FOREIGN KEY (transaction) REFERENCES public.dictionary_transactions(id);


--
-- Name: users_profiles FK_9b2591ba6e4a0b1e3f46e7f0304; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT "FK_9b2591ba6e4a0b1e3f46e7f0304" FOREIGN KEY (avatar_id) REFERENCES public.photos(id);


--
-- Name: tokens_activation FK_9c498766a46c11b268f22a0100b; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_activation
    ADD CONSTRAINT "FK_9c498766a46c11b268f22a0100b" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users_addresses FK_a6de63ed9c7d202b9cadae024df; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "FK_a6de63ed9c7d202b9cadae024df" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: offers FK_d80a9247acce63d19bd2597dced; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT "FK_d80a9247acce63d19bd2597dced" FOREIGN KEY (ownership) REFERENCES public.dictionary_ownerships(id);


--
-- Name: offers_addresses FK_fc6d19aabe26ff1c6929f8a6e73; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.offers_addresses
    ADD CONSTRAINT "FK_fc6d19aabe26ff1c6929f8a6e73" FOREIGN KEY (offer_id) REFERENCES public.offers(id);


--
-- PostgreSQL database dump complete
--

