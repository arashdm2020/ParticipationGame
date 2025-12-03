'use client'

import { useTranslations } from 'next-intl'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BuyShares } from '@/components/game/BuyShares'
import { VotingPanel } from '@/components/game/VotingPanel'
import { GameProgress } from '@/components/game/GameProgress'
import { WinnersHistory } from '@/components/game/WinnersHistory'
import { useContractData, useGameStatus } from '@/lib/hooks'
import { formatLUSD } from '@/lib/utils'
import Link from 'next/link'
import {
  Trophy,
  Users,
  Coins,
  TrendingUp,
  Zap,
  ArrowRight,
  Play,
  Shield,
  Sparkles,
  Target,
  Crown
} from 'lucide-react'

export default function Home() {
  const t = useTranslations()
  const { isConnected } = useAccount()
  const {
    gameId,
    gameDetails,
    participantCount,
    activeParticipantCount,
    userShares,
    isParticipant,
    totalPrizePoolAllGames,
  } = useContractData()
  const { statusName, isBuying, isVoting } = useGameStatus()

  const prizePool = gameDetails?.prizePool || 0n
  const tokenCap = gameDetails?.tokenCap || 0n
  const totalRevenue = gameDetails?.totalRevenue || 0n
  const progress = tokenCap > 0n ? Number((totalRevenue * 100n) / tokenCap) : 0

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500 mb-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">
                {t('home.liveGame')}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">{t('home.title')}</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                {t('home.subtitle')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              {t('home.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!isConnected ? (
                <ConnectButton />
              ) : (
                <>
                  <Link href="#game">
                    <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-8 py-6 text-lg">
                      <Play className="mr-2 h-5 w-5" />
                      {isBuying ? t('home.buyNow') : isVoting ? t('home.voteNow') : t('home.viewGame')}
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button size="lg" variant="outline" className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 px-8 py-6 text-lg">
                      {t('home.learnMore')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* Game Round */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-gray-400 text-sm mb-1">{t('home.round')}</p>
                <p className="text-2xl font-bold text-white">#{gameId?.toString()}</p>
              </CardContent>
            </Card>

            {/* Prize Pool */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-gray-400 text-sm mb-1">{t('home.prizePool')}</p>
                <p className="text-2xl font-bold text-amber-500">{formatLUSD(prizePool)}</p>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-gray-400 text-sm mb-1">{t('home.participants')}</p>
                <p className="text-2xl font-bold text-white">{isVoting ? activeParticipantCount : participantCount}</p>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-gray-400 text-sm mb-1">{t('home.filled')}</p>
                <p className="text-2xl font-bold text-white">{progress.toFixed(0)}%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Status Bar */}
      {isConnected && isParticipant && (
        <section className="relative border-y border-amber-500/30 bg-amber-500/5">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                <span className="text-gray-400">{t('home.shares')}:</span>
                <span className="text-white font-bold">{userShares.toString()}</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-500" />
                <span className="text-gray-400">{t('home.gameStatus')}:</span>
                <span className="text-amber-500 font-bold">{statusName}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Game Section */}
      <section id="game" className="relative py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isBuying ? t('home.buyNow') : isVoting ? t('home.voteNow') : t('winners.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          </div>

          {/* Main Game Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Main Action Area */}
            <div className="lg:col-span-2">
              {isBuying ? (
                <BuyShares />
              ) : isVoting ? (
                <VotingPanel variant="full" />
              ) : (
                <WinnersHistory />
              )}
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Live Stats Card */}
              <Card className="bg-gradient-to-br from-white/5 to-white/10 border-amber-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    {t('game.stats.title')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('home.totalPrizeAllGames')}</span>
                      <span className="text-white font-bold">{formatLUSD(totalPrizePoolAllGames || 0n)}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('home.currentPrize')}</span>
                      <span className="text-amber-500 font-bold">{formatLUSD(prizePool)}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('home.collected')}</span>
                      <span className="text-white font-bold">{formatLUSD(totalRevenue)}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('home.winnerPrize')}</span>
                      <span className="text-amber-500 font-bold">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Circle */}
              <Card className="bg-gradient-to-br from-white/5 to-white/10 border-amber-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">{t('home.gameStatus')}</h3>
                  <div className="flex justify-center mb-4">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="url(#goldGradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${progress * 4.4} 440`}
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-white">{progress.toFixed(0)}%</span>
                        <span className="text-sm text-gray-400">{t('home.filled')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-amber-500/20 text-amber-500 text-sm font-bold">
                      {statusName}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Game Progress */}
          <GameProgress />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('home.howItWorks')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('howItWorks.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Coins, title: t('home.step1Title'), desc: t('home.step1Desc'), num: '01' },
              { icon: Zap, title: t('home.step2Title'), desc: t('home.step2Desc'), num: '02' },
              { icon: Users, title: t('home.step3Title'), desc: t('home.step3Desc'), num: '03' },
              { icon: Trophy, title: t('home.step4Title'), desc: t('home.step4Desc'), num: '04' },
            ].map((step, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-amber-500/50 transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                      <step.icon className="h-6 w-6 text-amber-500" />
                    </div>
                    <span className="text-4xl font-bold text-white/10 group-hover:text-amber-500/20 transition-all">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10">
                {t('home.learnMore')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative py-16 px-4 bg-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('howItWorks.features.decentralized.title')}</h3>
              <p className="text-gray-400 text-sm">{t('howItWorks.features.decentralized.description')}</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('howItWorks.features.vrf.title')}</h3>
              <p className="text-gray-400 text-sm">{t('howItWorks.features.vrf.description')}</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('howItWorks.features.transparent.title')}</h3>
              <p className="text-gray-400 text-sm">{t('howItWorks.features.transparent.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
