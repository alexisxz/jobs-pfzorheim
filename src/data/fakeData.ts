import { Company } from "../types/Company";
import { Job } from "../types/Job";


export const fakeCompanies: Company[] = [
    {
        name: 'Böhmler GmbH',
        image: 'https://www.boehmler-drehteile.de/wp-content/uploads/2014/12/B%C3%B6hmler-Logo-Retina.png',
        partner: true,
        primaryColor: '#000000',
        secondaryColor: '#AF1F29',
        appliedEmails: []
    }
]

export const fakeJobs: Job[] = [
    {
        title: 'Einkäufer (m/w/d)',
        company: fakeCompanies[0],
        status: true,
        location: 'Pfzorheim',
        field: 'Einkauf',
        role: 'Berufserfahrene*r',
        postedDate: new Date(),
        startingDate: new Date(),
        workingTime: 'Vollzeit',
        tasks: ['der Einkaufsprozess von der Anfrage bis zur Rechnungskontrolle', 'der Einkauf von Rohmaterial und Dienstleistungen wie Galvanik, Wärmebehandlungen etc.', 'Stammdatenanlage und -pflege im ERP',],
        profile: ['abgeschlossene kaufmännische Ausbildung oder technische Ausbildung mit kaufmännischer Zusatzqualifikation', 'wünschenswert ist eine mehrjährige Berufserfahrung im Einkauf von Rohmaterialien in der metallverarbeitenden Industrie', 'geübter Umgang mit den gängigen ERP-Systemen und MS-Office Anwendungen', 'Teamfähigkeit und sehr gute organisatorische Fähigkeiten'],
        benefits: ['flexible Arbeitszeiten', 'nach Einarbeitung 1 Tag Homeoffice pro Woche möglich']
    },
    {
        title: 'Zerspanungsmechaniker (m/w/d) für CNC-Einspindeldrehtautomaten (Star, Tornos)',
        company: fakeCompanies[0],
        status: true,
        location: 'Pfzorheim',
        field: 'Automatendrehtechnik',
        role: 'Berufserfahrene*r',
        postedDate: new Date(),
        startingDate: new Date(),
        workingTime: 'Vollzeit',
        tasks: [],
        profile: ['mehrjährige Berufserfahrung im Bereich Automatendrehtechnik', 'selbstständiges Einrichten der Drehautomaten', 'hohes Maß an Qualitätsbewusstsein'],
        benefits: ['Arbeit im Einschichtbetrieb mit flexiblen Arbeitszeiten', 'flexible Urlaubsplanung über das gesamte Kalenderjahr', 'klimatisierte Arbeitsplätze', 'überdurchschnittliche Sozialleistungen und Sonderzahlungen', 'Firmenparkplatz', 'Jobrad', 'gutes Betriebsklima', 'Gesundheitsmanagement', 'Lieferdienst für Vesper und Mittagessen', 'und vieles mehr finden Sie unter „Böhmler als Arbeitgeber“'],
        emailsApplied: ['test@email.com']
    },
    {
        title: 'Zerspanungsmechaniker (m/w/d) für CNC-Ringdrehautomaten (escomatic)',
        company: fakeCompanies[0],
        status: true,
        location: 'Pfzorheim',
        field: 'Zerspanungsmechaniker',
        role: 'Berufserfahrene*r',
        postedDate: new Date(),
        startingDate: new Date(),
        workingTime: 'Vollzeit',
        tasks: [],
        profile: ['mehrjährige Berufserfahrung im Bereich Automatendrehtechnik', 'selbstständiges Einrichten der Drehautomaten', 'hohes Maß an Qualitätsbewusstsein'],
        benefits: ['Arbeit im Einschichtbetrieb mit flexiblen Arbeitszeiten', 'flexible Urlaubsplanung über das gesamte Kalenderjahr', 'klimatisierte Arbeitsplätze', 'überdurchschnittliche Sozialleistungen und Sonderzahlungen', 'Firmenparkplatz', 'Jobrad', 'gutes Betriebsklima', 'Gesundheitsmanagement', 'Lieferdienst für Vesper und Mittagessen']
    },
    {
        title: 'Zerspanungsmechaniker (m/w/d) für kurvengesteuerte Drehautomaten (Tornos, Gildemeister)',
        company: fakeCompanies[0],
        status: true,
        location: 'Pfzorheim',
        field: 'Zerspanungsmechaniker',
        role: 'Berufserfahrene*r',
        postedDate: new Date(),
        workingTime: 'Vollzeit',
        tasks: [],
        profile: ['mehrjährige Berufserfahrung im Bereich Automatendrehtechnik', 'selbstständiges Einrichten der Drehautomaten', 'hohes Maß an Qualitätsbewusstsein'],
        benefits: ['Arbeit im Einschichtbetrieb mit flexiblen Arbeitszeiten', 'flexible Urlaubsplanung über das gesamte Kalenderjahr', 'klimatisierte Arbeitsplätze', 'überdurchschnittliche Sozialleistungen und Sonderzahlungen', 'Firmenparkplatz', 'Jobrad', 'gutes Betriebsklima', 'Gesundheitsmanagement', 'Lieferdienst für Vesper und Mittagessen', 'und vieles mehr finden Sie unter „Böhmler als Arbeitgeber“']
    },
    {
        title: 'example1',
        company: fakeCompanies[0],
        status: true,
        location: 'Pfzorheim',
        field: 'Zerspanungsmechaniker',
        role: 'Berufserfahrene*r',
        postedDate: new Date(),
        workingTime: 'Vollzeit',
        tasks: [],
        profile: ['mehrjährige Berufserfahrung im Bereich Automatendrehtechnik', 'selbstständiges Einrichten der Drehautomaten', 'hohes Maß an Qualitätsbewusstsein'],
        benefits: ['Arbeit im Einschichtbetrieb mit flexiblen Arbeitszeiten', 'flexible Urlaubsplanung über das gesamte Kalenderjahr', 'klimatisierte Arbeitsplätze', 'überdurchschnittliche Sozialleistungen und Sonderzahlungen', 'Firmenparkplatz', 'Jobrad', 'gutes Betriebsklima', 'Gesundheitsmanagement', 'Lieferdienst für Vesper und Mittagessen', 'und vieles mehr finden Sie unter „Böhmler als Arbeitgeber“']
    },
    {
        title: 'example2',
        company: fakeCompanies[0],
        status: true,
        location: 'Pfzorheim',
        field: 'Zerspanungsmechaniker',
        role: 'Berufserfahrene*r',
        postedDate: new Date(),
        workingTime: 'Vollzeit',
        tasks: [],
        profile: ['mehrjährige Berufserfahrung im Bereich Automatendrehtechnik', 'selbstständiges Einrichten der Drehautomaten', 'hohes Maß an Qualitätsbewusstsein'],
        benefits: ['Arbeit im Einschichtbetrieb mit flexiblen Arbeitszeiten', 'flexible Urlaubsplanung über das gesamte Kalenderjahr', 'klimatisierte Arbeitsplätze', 'überdurchschnittliche Sozialleistungen und Sonderzahlungen', 'Firmenparkplatz', 'Jobrad', 'gutes Betriebsklima', 'Gesundheitsmanagement', 'Lieferdienst für Vesper und Mittagessen', 'und vieles mehr finden Sie unter „Böhmler als Arbeitgeber“']
    },
    {
        title: 'example3',
        company: fakeCompanies[0],
        status: true,
        location: 'Pfzorheim',
        field: 'Zerspanungsmechaniker',
        role: 'Berufserfahrene*r',
        postedDate: new Date(),
        workingTime: 'Vollzeit',
        tasks: [],
        profile: ['mehrjährige Berufserfahrung im Bereich Automatendrehtechnik', 'selbstständiges Einrichten der Drehautomaten', 'hohes Maß an Qualitätsbewusstsein'],
        benefits: ['Arbeit im Einschichtbetrieb mit flexiblen Arbeitszeiten', 'flexible Urlaubsplanung über das gesamte Kalenderjahr', 'klimatisierte Arbeitsplätze', 'überdurchschnittliche Sozialleistungen und Sonderzahlungen', 'Firmenparkplatz', 'Jobrad', 'gutes Betriebsklima', 'Gesundheitsmanagement', 'Lieferdienst für Vesper und Mittagessen', 'und vieles mehr finden Sie unter „Böhmler als Arbeitgeber“']
    },

]