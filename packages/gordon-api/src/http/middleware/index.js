module.exports = { requireAuth };

async function requireAuth(req) {
  if (!req.session.user) {
    return { status: 401 };
  }
}
