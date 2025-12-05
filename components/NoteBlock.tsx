import React from 'react'


export default function NoteBlock({ children }: { children: React.ReactNode }) {
return (
<aside className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
{children}
</aside>
)
}