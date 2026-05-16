import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const invitation = await prisma.invitation.findUnique({
    where: { slug }
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://10.27.127.137:3000'

  return {
    title: (invitation?.brideName || 'திருமண') + ' & ' + (invitation?.groomName || 'அழைப்பிதழ்'),
    description: 'Tap to view wedding invitation 💌',
    openGraph: {
      title: (invitation?.brideName || '') + ' & ' + (invitation?.groomName || ''),
      description: 'Tap to view wedding invitation 💌',
      images: [{
        url: baseUrl + '/api/og/' + params.slug,
        width: 400,
        height: 400,
      }],
    },
  }
}
import { GardenRomance } from "@/components/templates/GardenRomance";
import { MidnightRoyal } from "@/components/templates/MidnightRoyal";
import { ModernMinimal } from "@/components/templates/ModernMinimal";
import { MughalEmerald } from "@/components/templates/MughalEmerald";
import { RoseGoldBlush } from "@/components/templates/RoseGoldBlush";
import { RoyalElegance } from "@/components/templates/RoyalElegance";
import { prisma } from "@/lib/prisma";
import { InvitationRenderData, PreWeddingEvent, TamilTemplateId, TemplateViewProps } from "@/types";

const demoBase: Omit<InvitationRenderData, "templateId"> = {
  brideName: "ப்ரியா",
  groomName: "அர்ஜுன்",
  weddingDate: "2026-06-15T09:00:00.000Z",
  weddingTime: "காலை 9:00 மணி",
  venueName: "கல்யாண மண்டபம், சென்னை",
  venueAddress: "123, அண்ணா சாலை, சென்னை - 600001",
  mapLink: "https://www.google.com/maps?q=13.0827,80.2707&output=embed",
  bridePhoto: "https://images.unsplash.com/photo-1610182599804-bf9910f30739?auto=format&fit=crop&w=900&q=80",
  groomPhoto: "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=900&q=80",
  couplePhoto: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  slideshowPhotos: [
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  ],
  photo1: "https://images.unsplash.com/photo-1610182599804-bf9910f30739?auto=format&fit=crop&w=900&q=80",
  photo2: "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=900&q=80",
  photo3: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  photo4: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  musicTrack: "https://cdn.pixabay.com/download/audio/2023/02/10/audio_bddf2a3ceb.mp3?filename=beautiful-piano-ambient-144998.mp3",
  showPreWedding: true,
  preWeddingEvents: [
    { title: "மருதாணி நிகழ்வு", date: "13 ஜூன் 2026", time: "மாலை 5:00 மணி", venue: "மணமகள் இல்லம்" },
    { title: "இசை நிகழ்வு", date: "14 ஜூன் 2026", time: "மாலை 7:00 மணி", venue: "விழா மண்டபம்" },
    { title: "மஞ்சள் நிகழ்வு", date: "14 ஜூன் 2026", time: "காலை 10:00 மணி", venue: "மணமகன் இல்லம்" },
  ],
  showDressCode: true,
  dressCode: "உடை நெறிமுறை: ரோஸ் கோல்ட் / பாஸ்டல் நிறங்கள்",
  showTransport: true,
  transportInfo: "சென்னை சென்ட்ரலில் இருந்து இலவச வாகன வசதி ஏற்பாடு செய்யப்பட்டுள்ளது.",
};

const demoTemplateMap: Record<string, TamilTemplateId> = {
  "demo-rose-gold-blush": "rose-gold-blush",
  "demo-royal-elegance": "royal-elegance",
  "demo-garden-romance": "garden-romance",
  "demo-modern-minimal": "modern-minimal",
  "demo-mughal-emerald": "mughal-emerald",
  "demo-midnight-royal": "midnight-royal",
};

function renderTemplate(props: TemplateViewProps) {
  switch (props.invitation.templateId) {
    case "royal-elegance":
      return <RoyalElegance {...props} />;
    case "garden-romance":
      return <GardenRomance {...props} />;
    case "modern-minimal":
      return <ModernMinimal {...props} />;
    case "mughal-emerald":
      return <MughalEmerald {...props} />;
    case "midnight-royal":
      return <MidnightRoyal {...props} />;
    default:
      return <RoseGoldBlush {...props} />;
  }
}

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const demoTemplateId = demoTemplateMap[decodedSlug];

  if (demoTemplateId) {
    return (
      <>
        {renderTemplate({
          slug: decodedSlug,
          invitation: {
            ...demoBase,
            templateId: demoTemplateId,
            preWeddingEvents: demoBase.preWeddingEvents as PreWeddingEvent[],
          },
        })}
      </>
    );
  }

  const invitation = await prisma.invitation.findUnique({ where: { slug: decodedSlug } });
  if (!invitation || !invitation.isPublished) notFound();

  return (
    <>
      {renderTemplate({
        slug: decodedSlug,
        invitation: {
          ...invitation,
          templateId: invitation.templateId as TamilTemplateId,
          preWeddingEvents: Array.isArray(invitation.preWeddingEvents)
            ? (invitation.preWeddingEvents as unknown as PreWeddingEvent[])
            : [],
          photo1: invitation.photo1 || null,
          photo2: invitation.photo2 || null,
          photo3: invitation.photo3 || null,
          photo4: invitation.photo4 || null,
          familyNames: invitation.familyNames || null,
          contactNumber: invitation.contactNumber || null,
        } as InvitationRenderData,
      })}
    </>
  );
}
