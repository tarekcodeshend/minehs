const asyncHandler = require("express-async-handler");
const Bot = require("../../models/bot");
const mongoose = require("mongoose");

exports.get_bots_mm2 = asyncHandler(async (req, res, next) => {
  const bots = await Bot.find({ game: "MM2" });
  res.status(200).send(bots);
});

exports.get_bots_ps99 = asyncHandler(async (req, res, next) => {
  const bots = await Bot.find({ game: "PS99" });
  res.status(200).send(bots);
});

exports.add_bot = asyncHandler(async (req, res, next) => {
	const { robloxId, username, thumbnail, privateServer, status, game } = req.body
	const noidea = await Bot.create({
		robloxId,
		username,
		thumbnail,
		game,
		privateServer,
		status
	})
	await noidea.save()
	if(noidea)
		return res.status(200).json({
			message: "Added bot successfully!"
		})
})

exports.edit_bot = asyncHandler(async (req, res, next) => {
	const { robloxId, username, thumbnail, privateServer, status, game } = req.body
	const noidea = await Bot.findOne({robloxId});
	if(!noidea)
		return res.status(404).json({
			message: "Not found"
		})
		
	noidea.username = username
	noidea.thumbnail = thumbnail
	noidea.game = game
	noidea.privateServer = privateServer
	noidea.status = status
	
	await noidea.save()
	if(noidea)
		return res.status(200).json({
			message: "Added bot successfully!"
		})
})