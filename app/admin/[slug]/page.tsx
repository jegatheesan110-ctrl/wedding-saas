import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Guest Inbox",
};

export default async function AdminPage({ params, searchParams }: { params: { slug: string }; searchParams: { attendance?: string } }) {
  const session = await getAuthSession();
  if (!session?.user?.email) redirect("/login");

  const invitation = await prisma.invitation.findFirst({ where: { slug: params.slug, user: { email: session.user.email } }, include: { messages: { orderBy: { createdAt: "desc" } } } });
  if (!invitation) notFound();

  const filter = searchParams.attendance;
  const messages = filter ? invitation.messages.filter((message) => message.attendance === filter) : invitation.messages;
  const attending = invitation.messages.filter((message) => message.attendance === "வருகிறேன்").length;
  const declined = invitation.messages.filter((message) => message.attendance === "வர இயலவில்லை").length;

  return <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="text-white"><p className="font-display text-xl text-brand.blush">Guest Inbox</p><h1 className="mt-3 font-tamil text-5xl">{invitation.brideName} & {invitation.groomName}</h1><p className="mt-3 text-white/70">மொத்த பதில்கள்: {invitation.messages.length} | வருகிறேன்: {attending} | வர இயலவில்லை: {declined}</p></div><a href={`/api/messages/export?slug=${params.slug}`} className="rounded-full bg-brand.gold px-6 py-3 font-semibold text-black">Export as CSV</a></div><div className="mb-6 flex gap-3 text-sm text-white"><a href={`/admin/${params.slug}`} className="rounded-full border border-white/20 px-4 py-2">அனைத்தும்</a><a href={`/admin/${params.slug}?attendance=வருகிறேன்`} className="rounded-full border border-white/20 px-4 py-2">வருகிறேன்</a><a href={`/admin/${params.slug}?attendance=வர இயலவில்லை`} className="rounded-full border border-white/20 px-4 py-2">வர இயலவில்லை</a></div><div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/5"><table className="min-w-full text-left text-sm text-white"><thead className="bg-white/10 text-white/80"><tr><th className="px-4 py-3">பெயர்</th><th className="px-4 py-3">Attendance</th><th className="px-4 py-3">Count</th><th className="px-4 py-3">Message</th></tr></thead><tbody>{messages.map((message)=><tr key={message.id} className="border-t border-white/10"><td className="px-4 py-3">{message.guestName}</td><td className="px-4 py-3">{message.attendance}</td><td className="px-4 py-3">{message.guestCount}</td><td className="px-4 py-3">{message.message}</td></tr>)}</tbody></table></div></main>;
}
