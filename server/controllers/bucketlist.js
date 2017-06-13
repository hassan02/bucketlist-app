var mongoose = require('mongoose'),
    Bucketlist = mongoose.model('Bucketlist'),
    Item = mongoose.model('Item'),
    Promise = require('bluebird');

exports.fetchAll = function(req, res) {
    Bucketlist.find({
        creator: req.user
    }).exec(function(err, bucketlists) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        return res.status(200).json({
            results: bucketlists
        })
    })
}

exports.create = function(req, res) {
    var bucketlistData = req.body;
    if (!(bucketlistData.name)) {
        return res.status(400).json({
            error: "Name cannot be blank"
        })
    }
    var bucketlist = new Bucketlist(bucketlistData)
    bucketlist.creator = req.user
    bucketlist.save(function(err) {
        if (err) {
            return res.status(400).json({
                error: err.toString()
            })
        }
        return res.status(201).send(bucketlist)
    })
}

exports.fetchOne = function(req, res) {
    Bucketlist.findOne({
        id: req.params.bucketlistId
    }).lean().exec(function(err, bucketlist) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!bucketlist) {
            return res.status(404).json({
                message: "Bucketlist not found"
            })
        }
        if (bucketlist && bucketlist.creator != req.user._id) {
            return res.status(403).json({
                message: "Permission denied"
            })
        }
        Item.find({
            bucketlist: bucketlist._id
        }).exec(function(err, items) {
            bucketlist.items = err || !(items) ? [] : items
            return res.status(200).send(
                bucketlist
            )
        })

    })
}

exports.update = function(req, res) {
    var bucketlistData = req.body;
    Bucketlist.findOne({
        id: req.params.bucketlistId
    }).exec(function(err, bucketlist) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!bucketlist) {
            return res.status(404).json({
                message: "Bucketlist not found"
            })
        }
        if (bucketlist && bucketlist.creator != req.user._id) {
            return res.status(403).json({
                message: "Permission denied"
            })
        }
        bucketlist.name = bucketlistData.name || bucketlist.name
        bucketlist.save(function(err) {
            if (err) {
                return res.status(400).json({
                    error: err.toString()
                })
            }
            return res.status(200).send(bucketlist)
        })
    })
}

exports.delete = function(req, res) {
    Bucketlist.findOne({
        id: req.params.bucketlistId
    }).exec(function(err, bucketlist) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!bucketlist) {
            return res.status(404).json({
                message: "Bucketlist not found"
            })
        }
        if (bucketlist && bucketlist.creator != req.user._id) {
            return res.status(403).json({
                message: "Permission denied"
            })
        }
        bucketlist.remove(function(err) {
            if (err) {
                return res.status(500).json({
                    error: err.toString()
                })
            }
            return res.status(204).json({
                message: "Bucketlist deleted"
            })
        })
    })
}

exports.createItem = function(req, res) {
    var itemData = req.body;
    if (!(itemData.name)) {
        return res.status(400).json({
            error: "Name cannot be blank"
        })
    }
    var item = Item(itemData)
    Bucketlist.findOne({
        id: req.params.bucketlistId
    }).exec(function(err, bucketlist) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!bucketlist) {
            return res.status(404).json({
                message: "Bucketlist not found"
            })
        }
        if (bucketlist && bucketlist.creator != req.user._id) {
            return res.status(403).json({
                message: "Permission denied"
            })
        }
        item.bucketlist = bucketlist._id
        item.done = false
        item.save(function(err) {
            if (err) {
                return res.status(500).json({
                    error: err.toString()
                })
            }
            return res.status(201).send(item)
        })
    })
}

exports.getItem = function(req, res) {
    Bucketlist.findOne({
        id: req.params.bucketlistId
    }).exec(function(err, bucketlist) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!bucketlist) {
            return res.status(404).json({
                message: "Bucketlist not found"
            })
        }
        if (bucketlist && bucketlist.creator != req.user._id) {
            return res.status(403).json({
                message: "Permission denied"
            })
        }
        Item.findOne({
            id: req.params.itemId,
            bucketlist: bucketlist._id
        }).exec(function(err, item) {
            if (err) {
                return res.status(500).json({
                    error: err.toString()
                })
            }
            if (!item) {
                return res.status(404).json({
                    message: "Item not found"
                })
            }
            return res.status(200).send(item)
        })
    })
}

exports.updateItem = function(req, res) {
    var itemData = req.body;
    Bucketlist.findOne({
        id: req.params.bucketlistId
    }).exec(function(err, bucketlist) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!bucketlist) {
            return res.status(404).json({
                message: "Bucketlist not found"
            })
        }
        if (bucketlist && bucketlist.creator != req.user._id) {
            return res.status(403).json({
                message: "Permission denied"
            })
        }
        Item.findOne({
            id: req.params.itemId,
            bucketlist: bucketlist._id
        }).exec(function(err, item) {
            if (err) {
                return res.status(500).json({
                    error: err.toString()
                })
            }
            if (!item) {
                return res.status(404).json({
                    message: "Item not found"
                })
            }
            item.name = itemData.name || item.name
            item.done = itemData.done ? itemData.done.toString().toLowerCase() === "true" : item.done
            item.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: err.toString()
                    })
                }
                return res.status(200).send(item)
            })
        })
    })
}

exports.deleteItem = function(req, res) {
    Bucketlist.findOne({
        id: req.params.bucketlistId
    }).exec(function(err, bucketlist) {
        if (err) {
            return res.status(500).json({
                error: err.toString()
            })
        }
        if (!bucketlist) {
            return res.status(404).json({
                message: "Bucketlist not found"
            })
        }
        if (bucketlist && bucketlist.creator != req.user._id) {
            return res.status(403).json({
                message: "Permission denied"
            })
        }
        Item.findOne({
            id: req.params.itemId,
            bucketlist: bucketlist._id
        }).exec(function(err, item) {
            if (err) {
                return res.status(500).json({
                    error: err.toString()
                })
            }
            if (!item) {
                return res.status(404).json({
                    message: "Item not found"
                })
            }
            item.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: err.toString()
                    })
                }
                return res.status(204).json({
                    message: "Item deleted"
                })
            })
        })
    })

}

//
// var mongoose = require("mongoose");
// var Bucketlist = mongoose.model("Bucketlist");
// var Item = mongoose.model("Item");
// var Promise = require("bluebird");
//
// exports.fetchAll = function(req, res) {
//     Bucketlist.find({
//         creator: req.user
//     }).exec(function(err, bucketlists) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             });
//         }
//         return res.status(200).json({
//             results: bucketlists
//         });
//     });
// };
//
// exports.create = function(req, res) {
//     var bucketlistData = req.body;
//     if (!(bucketlistData.name)) {
//         return res.status(400).json({
//             error: "Name cannot be blank"
//         });
//     };
//     var bucketlist = new Bucketlist(bucketlistData)
//     bucketlist.creator = req.user
//     bucketlist.save(function(err) {
//         if (err) {
//             return res.status(400).json({
//                 error: err.toString()
//             })
//         }
//         return res.status(201).send(bucketlist)
//     })
// }
//
// exports.fetchOne = function(req, res) {
//     Bucketlist.findOne({
//         id: req.params.bucketlistId
//     }).lean().exec(function(err, bucketlist) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             })
//         }
//         if (!bucketlist) {
//             return res.status(404).json({
//                 message: "Bucketlist not found"
//             })
//         }
//         if (bucketlist && bucketlist.creator != req.user._id) {
//             return res.status(403).json({
//                 message: "Permission denied"
//             })
//         }
//         Item.find({
//             bucketlist: bucketlist._id
//         }).exec(function(err, items) {
//             bucketlist.items = err || !(items) ? [] : items
//             return res.status(200).send(
//                 bucketlist
//             )
//         })
//
//     })
// }
//
// exports.update = function(req, res) {
//     var bucketlistData = req.body;
//     Bucketlist.findOne({
//         id: req.params.bucketlistId
//     }).exec(function(err, bucketlist) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             })
//         }
//         if (!bucketlist) {
//             return res.status(404).json({
//                 message: "Bucketlist not found"
//             })
//         }
//         if (bucketlist && bucketlist.creator != req.user._id) {
//             return res.status(403).json({
//                 message: "Permission denied"
//             })
//         }
//         bucketlist.name = bucketlistData.name || bucketlist.name
//         bucketlist.save(function(err) {
//             if (err) {
//                 return res.status(400).json({
//                     error: err.toString()
//                 })
//             }
//             return res.status(200).send(bucketlist)
//         })
//     })
// }
//
// exports.delete = function(req, res) {
//     Bucketlist.findOne({
//         id: req.params.bucketlistId
//     }).exec(function(err, bucketlist) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             })
//         }
//         if (!bucketlist) {
//             return res.status(404).json({
//                 message: "Bucketlist not found"
//             })
//         }
//         if (bucketlist && bucketlist.creator != req.user._id) {
//             return res.status(403).json({
//                 message: "Permission denied"
//             })
//         }
//         bucketlist.remove(function(err) {
//             if (err) {
//                 return res.status(500).json({
//                     error: err.toString()
//                 })
//             }
//             return res.status(204).json({
//                 message: "Bucketlist deleted"
//             })
//         })
//     })
// }
//
// exports.createItem = function(req, res) {
//     var itemData = req.body;
//     if (!(itemData.name)) {
//         return res.status(400).json({
//             error: "Name cannot be blank"
//         })
//     }
//     var item = Item(itemData)
//     Bucketlist.findOne({
//         id: req.params.bucketlistId
//     }).exec(function(err, bucketlist) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             })
//         }
//         if (!bucketlist) {
//             return res.status(404).json({
//                 message: "Bucketlist not found"
//             })
//         }
//         if (bucketlist && bucketlist.creator != req.user._id) {
//             return res.status(403).json({
//                 message: "Permission denied"
//             })
//         }
//         item.bucketlist = bucketlist._id
//         item.done = false
//         item.save(function(err) {
//             if (err) {
//                 return res.status(500).json({
//                     error: err.toString()
//                 })
//             }
//             return res.status(201).send(item)
//         })
//     })
// }
//
// exports.getItem = function(req, res) {
//     Bucketlist.findOne({
//         id: req.params.bucketlistId
//     }).exec(function(err, bucketlist) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             })
//         }
//         if (!bucketlist) {
//             return res.status(404).json({
//                 message: "Bucketlist not found"
//             })
//         }
//         if (bucketlist && bucketlist.creator != req.user._id) {
//             return res.status(403).json({
//                 message: "Permission denied"
//             })
//         }
//         Item.findOne({
//             id: req.params.itemId,
//             bucketlist: bucketlist._id
//         }).exec(function(err, item) {
//             if (err) {
//                 return res.status(500).json({
//                     error: err.toString()
//                 })
//             }
//             if (!item) {
//                 return res.status(404).json({
//                     message: "Item not found"
//                 })
//             }
//             return res.status(200).send(item)
//         })
//     })
// }
//
// exports.updateItem = function(req, res) {
//     var itemData = req.body;
//     Bucketlist.findOne({
//         id: req.params.bucketlistId
//     }).exec(function(err, bucketlist) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             })
//         }
//         if (!bucketlist) {
//             return res.status(404).json({
//                 message: "Bucketlist not found"
//             })
//         }
//         if (bucketlist && bucketlist.creator != req.user._id) {
//             return res.status(403).json({
//                 message: "Permission denied"
//             })
//         }
//         Item.findOne({
//             id: req.params.itemId,
//             bucketlist: bucketlist._id
//         }).exec(function(err, item) {
//             if (err) {
//                 return res.status(500).json({
//                     error: err.toString()
//                 })
//             }
//             if (!item) {
//                 return res.status(404).json({
//                     message: "Item not found"
//                 })
//             }
//             item.name = itemData.name || item.name
//             item.done = itemData.done ? itemData.done.toString().toLowerCase() === "true" : item.done
//             item.save(function(err) {
//                 if (err) {
//                     return res.status(500).json({
//                         error: err.toString()
//                     })
//                 }
//                 return res.status(200).send(item)
//             })
//         })
//     })
// }
//
// exports.deleteItem = function(req, res) {
//     Bucketlist.findOne({
//         id: req.params.bucketlistId
//     }).exec(function(err, bucketlist) {
//         if (err) {
//             return res.status(500).json({
//                 error: err.toString()
//             })
//         }
//         if (!bucketlist) {
//             return res.status(404).json({
//                 message: "Bucketlist not found"
//             })
//         }
//         if (bucketlist && bucketlist.creator != req.user._id) {
//             return res.status(403).json({
//                 message: "Permission denied"
//             })
//         }
//         Item.findOne({
//             id: req.params.itemId,
//             bucketlist: bucketlist._id
//         }).exec(function(err, item) {
//             if (err) {
//                 return res.status(500).json({
//                     error: err.toString()
//                 })
//             }
//             if (!item) {
//                 return res.status(404).json({
//                     message: "Item not found"
//                 })
//             }
//             item.remove(function(err) {
//                 if (err) {
//                     return res.status(500).json({
//                         error: err.toString()
//                     })
//                 }
//                 return res.status(204).json({
//                     message: "Item deleted"
//                 })
//             })
//         })
//     })
//
// }
//
