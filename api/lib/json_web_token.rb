class JsonWebToken # Thanks to https://medium.com/binar-academy/rails-api-jwt-authentication-a04503ea3248
  SECRET_KEY = 'SAFSAFasfascq3rasD@!Q'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end
end