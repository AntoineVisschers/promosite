import './globals.css'
import React from 'react'


export const metadata = {
title: 'Promosite',
description: 'Promosite with Next.js + Sanity + Markdown'
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="fr">
<body>
{children}
</body>
</html>
)
}