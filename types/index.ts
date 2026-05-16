export type TamilTemplateId = "royal-elegance" | "garden-romance" | "modern-minimal" | "mughal-emerald" | "rose-gold-blush" | "midnight-royal";
export type AttendanceOption = "வருகிறேன்" | "வர இயலவில்லை" | "யோசிக்கிறேன்";

export type PreWeddingEvent = { title: string; date: string; time: string; venue: string };

export type InvitationFormData = {
  id?: string; slug?: string; templateId: TamilTemplateId; brideName: string; groomName: string; weddingDate: string; weddingTime?: string | null; venueName?: string | null; venueAddress?: string | null;
  mapLink?: string | null; bridePhoto?: string | null; groomPhoto?: string | null; couplePhoto?: string | null; slideshowPhotos: string[]; photoCaptions?: string[]; musicTrack?: string | null;
  showPreWedding: boolean; preWeddingEvents: PreWeddingEvent[]; showDressCode: boolean; dressCode?: string | null; showTransport: boolean; transportInfo?: string | null; isPublished: boolean;
  familyNames?: string | null; contactNumber?: string | null; email?: string | null;
  photo1?: string | null; photo2?: string | null; photo3?: string | null; photo4?: string | null;
};

export type InvitationRenderData = {
  templateId: TamilTemplateId; brideName: string; groomName: string; weddingDate: string | Date; weddingTime?: string | null; venueName?: string | null; venueAddress?: string | null;
  mapLink?: string | null; bridePhoto?: string | null; groomPhoto?: string | null; couplePhoto?: string | null; slideshowPhotos: string[]; musicTrack?: string | null;
  showPreWedding: boolean; preWeddingEvents: PreWeddingEvent[]; showDressCode: boolean; dressCode?: string | null; showTransport: boolean; transportInfo?: string | null;
  familyNames?: string | null;
  contactNumber?: string | null;
  photo1?: string | null; photo2?: string | null; photo3?: string | null; photo4?: string | null;
};

export type TemplateViewProps = { invitation: InvitationRenderData; slug: string };

export type InvitationTheme = {
  background: string;
  namesColor: string;
  textColor: string;
  accentColor: string;
  dividerColor: string;
  countdownBg: string;
  sectionBg?: string;
  alternateBg?: string;
  mapBg?: string;
  buttonBg?: string;
  scratchBorder?: string;
  ornament?: string;
  emojis?: string[];
};
