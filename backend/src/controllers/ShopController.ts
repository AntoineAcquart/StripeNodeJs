import { Stripe } from 'stripe'
import { getRepository } from 'typeorm'
import { User } from '../entities/User'
import * as jwt from "jsonwebtoken"
import { Request, Response } from "express"

const URL = 'http://localhost:3000'
const stripe = new Stripe('sk_test_51ICMVxHmOoJeDnTyXbYv3PlQ3sw9xdETaQKTg5XrP79GEYe9vgVmfJYImbVBsACA8WaeVj6YH6340aR5u87R3BBK00VjzPX2E3', null)

class ShopController {

  public static createCheckoutSession = async (req: Request, res: Response) => {
    const token = req.body.token
    const itemId = req.body.itemId
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Unlock Undercover client themes',
              images: ["https://i.ibb.co/ZgNn2yr/undercover-client-themes.png"],
            },
            unit_amount: 599,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${URL}/shop/success/${token}/${itemId}`,
      cancel_url: `${URL}/shop/cancel`,
    })
    console.log("stripe session:", session.id)
    res.json({ id: session.id })
  }

  public static getThemes = async (req, res) => {
    const id = req.params.id
    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      res.status(401).send()
      return
    }
    res.status(200).send(user)
  }

  public static onSuccess = async (req: Request, res: Response) => {
    const token = req.params.token
    const userId = jwt.decode(token, { complete: true }).payload.userId
    const itemId = req.params.itemId
    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(userId)
    } catch (id) {
      res.status(401).send()
      return
    }
    user.items += `${itemId}|`
    await userRepository.save(user)
    res.redirect(`http://localhost:4200/shop/success/${itemId}`)
  }

  public static onCancel = async (req, res) => {
    res.redirect('http://localhost:4200/shop/cancel')
  }
}

export default ShopController
