import { Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get()
  getHello(): any {
    return 'Hello World!';
  }
  @Get()
  findAll(@Req() req, @Res() res) {
    res.status(200).json({
      message: 'Hello World!',
    });
  }

  @Post()
  create(@Req() req, @Res() res) {
    res.status(201).json({
      message: 'Data created successfully!',
    });
  }
}
