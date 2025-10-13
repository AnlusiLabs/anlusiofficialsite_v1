export type SectionType = 'loader' | 'landing' | 'hero' | 'intro' | 'benefits' | 'problem' | 'interface' | 'results' | 'how-it-works' | 'projects' | 'whoarewe' | 'cta' | 'footer' | 'integrations'

export interface SectionProps {
  onComplete?: () => void
  onNext?: () => void
  onBack?: () => void
}

export interface LoaderSectionProps extends SectionProps {
  onComplete: () => void
}

export interface LandingSectionProps extends SectionProps {
  onEnterWithAudio: () => void
  onEnterWithoutAudio: () => void
}

export interface HeroSectionProps extends SectionProps {
  hasAudio: boolean
  onReadyToTalk: () => void
  onSoundToggle: () => void
}

export interface IntroSectionProps extends SectionProps {
  onScrollToBenefits: () => void
  onBackToHero: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface BenefitsSectionProps extends SectionProps {
  onBackToIntro: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface ProblemSectionProps extends SectionProps {
  onBackToBenefits: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface InterfaceSectionProps extends SectionProps {
  onBackToProblem: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface ResultsSectionProps extends SectionProps {
  onBackToInterface: () => void
  onNextToHowItWorks: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface HowItWorksSectionProps extends SectionProps {
  onBackToResults: () => void
  onShowProjects?: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface ProjectsSectionProps extends SectionProps {
  onBackToHowItWorks: () => void
  onNextToWhoAreWe?: () => void
  fromWhoAreWe?: boolean
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface IntegrationsSectionProps extends SectionProps {
  onBackToHowItWorks: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface WhoAreWeSectionProps extends SectionProps {
  onBackToProjects?: () => void
  onNextToCTA?: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}


export interface CTASectionProps extends SectionProps {
  onBackToWhoAreWe?: () => void
  onRevealFooter?: () => void
  disableScrollHandling?: boolean
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface FooterSectionProps extends SectionProps {
  onBackToCTA?: () => void
  hasAudio: boolean
  onSoundToggle: () => void
}

export interface CurtainTransitionProps {
  isActive: boolean
}
