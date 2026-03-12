import "server-only"

// https://nextjs.org/docs/app/guides/instrumentation
async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const cron = await import("node-cron")
    const { prisma } = await import("./lib/prisma-client")

    // once an hour
    cron.schedule("0 * * * *", async () => {
      console.log("Running altcha cleanup cron...")
      try {
        await prisma.usedAltchaChallenge.deleteMany({ where: { expiresAt: { lt: new Date() } } })
        await prisma.verification.deleteMany({ where: { expiresAt: { lt: new Date() } } })
        await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } })
      }
      catch (e) {
        console.error("Failed to cleanup altcha challenges:", e)
      }
    })
  }
}

export { register }
