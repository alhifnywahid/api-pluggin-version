const fs = require("fs");
const path = require("path");
const apikey = require("../middleware/authApiKey");

const loadRouters = (app) => {
	const routes = [];
	const routersDir = path.join(__dirname);

	fs.readdirSync(routersDir).forEach((folder) => {
		const folderPath = path.join(routersDir, folder);
		if (fs.lstatSync(folderPath).isDirectory()) {
			fs.readdirSync(folderPath).forEach((file) => {
				if (file.endsWith(".js")) {
					const routerPath = path.join(folderPath, file);
					const { routes: routeConfig } = require(routerPath);

					if (routeConfig.authorization) { 
						app[routeConfig.method](routeConfig.path, apikey, routeConfig.execution);
					} else { 
						app[routeConfig.method](routeConfig.path, routeConfig.execution);
					}

					app[routeConfig.method](routeConfig.path, routeConfig.execution);
					routes.push({
						name: routeConfig.name,
						category: routeConfig.category,
						path: routeConfig.path,
						method: routeConfig.method,
						parameter: routeConfig.parameter,
						example: routeConfig.example,
					});
				}
			});
		}
	});

	app.get("/", (req, res) => {
		res.render("index", { title: "Home Page", message: "Halo Bro", routes });
	});
	app.get("/shopeelink", (req, res) => {
		const data = [
			{
				name: "[3 Pcs] Singlet HING'S, Rider, GT-Man",
				link: "https://shopee.co.id/-3-Pcs-Singlet-HING'S-123B-Pria-Dewasa-Kaos-Dalam-Hings-Pakaian-Dalam-Hing-GTman-Dewasa-Rider-GT-i.547417187.15603798300",
			},
			{
				name: "Eceran GT-Man",
				link: "https://shopee.co.id/Kaos-Dalam-Pria-GT-Man-Original-32-34-36-38-40-42-i.22717576.8318050230",
			},
			{
				name: "LISTERINE Antiseptic Mouthwash | Obat Kumur Antiseptik | 500 ml | BPOM",
				link: "https://shopee.co.id/%E2%9D%A4-BELIA-%E2%9D%A4-LISTERINE-Antiseptic-Mouthwash-Obat-Kumur-Antiseptik-500-ml-BPOM-i.48382819.23220011434",
			},
			{
				name: "DARLIE Pasta Gigi All Shiny White Foamy Baking Soda 140g - (2 Pcs) - (Variasi)",
				link: "https://shopee.co.id/DARLIE-Pasta-Gigi-All-Shiny-White-Foamy-Baking-Soda-140g-(2-Pcs)-i.277362018.20514310641",
			},
			{
				name: "Kahf Oil and Acne Care Face Wash",
				link: "https://shopee.co.id/Kahf-Oil-and-Acne-Care-Face-Wash-i.323233231.4358912867",
			},
			{
				name: "Shampho ZINK Refreshing Cool 2 x 340 mL",
				link: "https://shopee.co.id/Zinc-Shampoo-Refreshing-Cool-2-x-340-mL-i.65323877.8479905515",
			},
			{
				name: "Kahf Paket Face Care Isi 4 pcs - Face Wash, Toner, Serum, & Sunscreen",
				link: "https://shopee.co.id/Kahf-Paket-Face-Care-Isi-4-pcs-Face-Wash-Toner-Serum-Sunscreen-i.323233231.17992797449",
			},
			{
				name: "Kahf Paket Face Care Isi 3pcs - Face Wash, Sunscreen, & Serum",
				link: "https://shopee.co.id/Kahf-Paket-Face-Care-Isi-3pcs-Face-Wash-Sunscreen-Serum-i.326487418.23975575267",
			},
			{
				name: "Ikat Rambut Donat Korea Isi 50",
				link: "https://shopee.co.id/ACC148-Ikat-Rambut-Donat-Korea-Isi-50-Karet-Rambut-Wanita-i.5282124.19791105062",
			},
			{
				name: "3PCS.. kaos dalam pria GT men barang stok pabrik cuci gudang rijek",
				link: "https://shopee.co.id/3PCS..-kaos-dalam-pria-GT-men-barang-stok-pabrik-cuci-gudang-rijek-ukuran-i.301422317.17224535314?xptdk=33c1e102-a962-4a3c-9fac-1917727d84d0",
			},
			{
				name: "[KM] RACUN CICAK HERBAL AMPUH SEKALI JILAT LANGSUNG MATI",
				link: "https://shopee.co.id/-KM-RACUN-CICAK-HERBAL-AMPUH-SEKALI-JILAT-LANGSUNG-MATI-i.302968168.22175380406?xptdk=8035c6c8-622a-4bd5-b824-70ec824ec5ef",
			},
			{
				name: "Adapter Kepala Magnet Obeng Sekrup Magnetic Ring Screwdriver UNIVERSAL 6.35MM 1/4 INCH",
				link: "https://shopee.co.id/Adapter-Kepala-Magnet-Obeng-Sekrup-Magnetic-Ring-Screwdriver-UNIVERSAL-6.35MM-1-4-INCH-i.1075594111.18795275582?xptdk=fdfad8d1-b789-4b2e-b308-bfc81e9f37a0",
			},
			{
				name: "Zinc Shampoo Refreshing Cool Botol 450Ml",
				link: "https://shopee.co.id/Zinc-Shampoo-Refreshing-Cool-Botol-450Ml-i.64474495.22983483033?xptdk=b6535c8e-d33b-42f1-97d9-f2c59d4bc15d",
			},
			{
				name: "Celana jens pria celana jeans gombrong pria celana panjang pria jeans standar straight kulot kekinian",
				link: "https://shopee.co.id/Celana-jens-pria-celana-jeans-gombrong-pria-celana-panjang-pria-jeans-standar-straight-kulot-kekinian-celana-cowok-gaya-korea-Jeans-Karet-Jumbo-Biru-Muda-Murah-i.1125367200.24602472327?xptdk=dbf77e98-f8c1-4279-9f23-076d05385fe3",
			},
			{
				name: "Celana jeans pria baggy pants korean style oversize loose blue jeans straight kulot boyfriend jeans longgar celana cowo celana panjang denim",
				link: "https://shopee.co.id/Celana-jeans-pria-baggy-pants-korean-style-oversize-loose-blue-jeans-straight-kulot-boyfriend-jeans-longgar-celana-cowo-celana-panjang-denim-i.598507005.23480044489?xptdk=3a9f55ab-1f63-4a81-9d26-2c811e413067",
			},
			{
				name: "celana korduroy pria corduroy pants pria celana oversize pria wide leg korean style corduroy Pacar celana longgar",
				link: "https://shopee.co.id/celana-korduroy-pria-corduroy-pants-pria-celana-oversize-pria-wide-leg-korean-style-corduroy-Pacar-celana-longgar-celana-kulot-pria-sederhana-import-premium-black-celana-Murah-fashion-lurus-celana-big-size-celana-corduroy-pants-loose-pants-pria-celana-i.748253827.21229432835?xptdk=81ce4924-1c53-43f2-84fe-0f2824ce5561",
			},
			{
				name: "USB Hub 7 Port ON-OFF USB 2.0 Port Saklar",
				link: "https://shopee.co.id/USB-Hub-7-Port-ON-OFF-USB-2.0-Port-Saklar-i.1595516.1200243953?xptdk=a5d546f1-cd12-492a-9cc6-ce31fd8f0d0c",
			},
			{
				name: "HELM Cakil Helm Retro M30 Bandit Mini moto CUSTOM |Cakil Murah|Cakil Populer",
				link: "https://shopee.co.id/HELM-Cakil-Helm-Retro-M30-Bandit-Mini-moto-CUSTOM-Cakil-Murah-Cakil-Populer--i.168165567.3503967431?xptdk=3942d58c-87bc-468c-bf71-330dfe7ce6ce",
			},
			{
				name: "(5 Pasang Sport Pendek Kuping) Kaos Kaki sport Pendek/kaos kaki olahraga pendek",
				link: "https://shopee.co.id/(5-Pasang-Sport-Pendek-Kuping)-Kaos-Kaki-sport-Pendek-kaos-kaki-olahraga-pendek-i.135070524.22952821342?xptdk=f050ee3e-19e1-4ee7-97de-9fe7c1a2a9d5",
			},
		];
		res.json({
			total: data.length,
			data: data,
		});
	});
};

module.exports = loadRouters;
