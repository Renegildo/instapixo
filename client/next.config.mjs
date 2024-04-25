/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "instapixo-p6pq.vercel.app/",
				port: "",
				pathname: "/uploads/**",
			},
		],
	},
};

export default nextConfig;
